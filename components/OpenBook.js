
import { readFile, exists, mkdir, writeFile, unlink, DocumentDirectoryPath, CachesDirectoryPath } from "react-native-fs";
import { unzip } from "react-native-zip-archive";
import AsyncStorage from "@react-native-async-storage/async-storage";


//eBook: result from DocumentPicker.pickSingle
//return: {title: title, chapters: chapters, files: spineItems, currFile: 0, weight: 0};
export default async function openBook(ebook) {
    //check if it exists in the filesystem

    const found = await exists(DocumentDirectoryPath + "/" + ebook.name + "/");

    //if it does, open it
    if (found) {

        AsyncStorage.getItem(ebook.name).then((value) => {
            if (value != null) {
                return JSON.parse(value);
            }
        });

    }
    //if not, unzip the file and open it
    else {
        //unzip the file
        try {
            await mkdir(DocumentDirectoryPath + "/" + ebook.name);
        } catch (e) {
            console.log("mkdir" + e);
        }
        const binary = await readFile(ebook.uri, "base64");
        await writeFile(CachesDirectoryPath + "/" + ebook.name + ".zip", binary, "base64");
        await unzip(CachesDirectoryPath + "/" + ebook.name + ".zip", DocumentDirectoryPath + "/" + ebook.name, "utf-8");
        await unlink(CachesDirectoryPath + "/" + ebook.name + ".zip");

        var bookPath = DocumentDirectoryPath + "/" + ebook.name + "/";


        //open the container.xml file in the META-INF folder
        const container = await readFile(bookPath + "META-INF/container.xml", "utf8");
        //get the path to the opf file
        const opfPath = container.substring(container.indexOf("full-path=") + 11, container.indexOf(".opf") + 4);
        //open the opf file
        const opf = await readFile(bookPath + opfPath, "utf8");
        //get the path to the ncx which contains the TOC
        //probably not necessary
        //const ncxPath = opf.substring(opf.indexOf("id=\"ncx\" href=\"") + 15, opf.indexOf("\" media-type=\"application/x-dtbncx+xml\""));
        //open the ncx file
        //TODO: check if all epubs have TOC in the OEBPS folder

        var ncx = "";
        try {
            ncx = await readFile(bookPath + "toc.ncx", "utf8");
        } catch (e) {
            ncx = await readFile(bookPath + "OEBPS/toc.ncx", "utf8");
            bookPath = bookPath + "OEBPS/";
        }
        //get the title and remove any tags
        var title = "";
        if (opf.indexOf("<dc:title>") != -1) {
            title = opf.substring(opf.indexOf("<dc:title>") + 10, opf.indexOf("</dc:title>"));
        } else {
            title = opf.substring(opf.indexOf("<docTitle>") + 10, opf.indexOf("</docTitle>"));
        }

        //get the author and remove any tags
        var author = "";
        if (opf.indexOf("<dc:creator") != -1) {
            author = opf.substring(opf.indexOf(">", opf.indexOf("<dc:creator") + 10) + 1, opf.indexOf("</dc:creator>", opf.indexOf("<dc:creator")));
        } else {
            author = opf.substring(opf.indexOf("<docAuthor>") + 12, opf.indexOf("</docAuthor>"));
        }
        //split the ncx file into an array of chapters, add chapters from content.opf 
        //until the next href in content matches the next content src in ncx

        const chaptersXML = ncx.split("<navPoint");

        //gets every file in the manifest
        const manifest = opf.substring(opf.indexOf("<manifest>"), opf.indexOf("</manifest>"));
        //maybe actually parse this like XML cause the order is not guaranteed
        const manifestItems = manifest.split("<item").map((item) => {
            const splitItem = item.split(" ");
            const object = { id: "", path: "" };
            splitItem.forEach((attribute) => {
                if (attribute.indexOf("id=") != -1) {
                    object.id = attribute.substring(attribute.indexOf("id=") + 4, attribute.length - 1);
                }
                if (attribute.indexOf("href=") != -1) {
                    object.path = bookPath + attribute.substring(attribute.indexOf("href=") + 6, attribute.length - 1);
                }
            });
            return object;

        });


        //we gotta sort them by the order in <spine>
        const spine = opf.substring(opf.indexOf("<spine"), opf.indexOf("</spine>"));
        //remove the first item because its the TOC
        const spineItems = spine.split("<itemref").slice(1).map((item) => {
            return { id: item.substring(item.indexOf("idref=") + 7, item.indexOf("\"", item.indexOf("idref=") + 8)) };
        });

        //chapters in the TOC

        const chapters = chaptersXML.slice(1).map((chapter) => {
            //get the chapter title from the text tag
            const chapterTitle = chapter.substring(chapter.indexOf("<text>") + 6, chapter.indexOf("</text>"));
            //get the chapter path from the content tag
            const srcStart = chapter.indexOf("src=\"") + 5;
            const chapterPath = chapter.substring(srcStart, chapter.indexOf(".html", srcStart) + 5);
            const chapterNumber = manifestItems.findIndex((item) => { return item.path === bookPath + chapterPath });
            return { title: chapterTitle, path: bookPath + chapterPath, number: chapterNumber };
        });

        var coverPath = "";
        if (manifestItems.find((item) => { return item.id === "cover-image" }) != undefined) {
            coverPath = manifestItems.find((item) => { return item.id === "cover-image" }).path;
        } else {
            coverPath = manifestItems.find((item) => { return item.id === "cover" }).path;
        }
        console.log(coverPath);

        //TODO: write down all these types

        
        //okay you cant just get the next file for some goddamn reason, chapters aren't in chronological order
        const book = { title: title, author: author, chapters: chapters, files: manifestItems.slice(1), currFile: chapters[1].number, cover: coverPath, currPos: 0 };
        const bookStorage = JSON.stringify(book);
        await AsyncStorage.setItem(book.title, bookStorage);


        //add the book to the list of books
        const books = await AsyncStorage.getItem("books");
        if (books != null) {
            const booksArray = JSON.parse(books);
            booksArray.push({ title: book.title, author: book.author, cover: coverPath, bookPath: bookPath, weight: 0 });
            await AsyncStorage.setItem("books", JSON.stringify(booksArray));
        } else {
            await AsyncStorage.setItem("books", JSON.stringify([{ title: book.title, author: book.author, cover: coverPath, bookPath: bookPath, weight: 0 }]));
        }
        return book;

    }

}



///change chapter currfile to a number not a path