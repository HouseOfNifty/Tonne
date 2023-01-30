import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { readFile, readDir } from 'react-native-fs';
import Video from 'react-native-video';

import oneBook from '../images/1Book.webm';
import twoBooks from '../images/2Books.webm';
import fiveBooks from '../images/5Books.webm';
import tenBooks from '../images/10Books.webm';

export default function WeightPage() {


    const weightPairs = [{weight: 2, image, oneBook}, {weight: 3, image: twoBooks}, {weight: 10, image: fiveBooks}, {weight: 30, image: tenBooks}];

    const [weight, setWeight] = useState(0);
    const [image, setImage] = useState(twoBooks);

    const weigh = async () => {
        const books = await AsyncStorage.getItem("books");
        const bookList = JSON.parse(books);


        const filteredBooks = bookList.filter(async (book) => {
            const bookData = await AsyncStorage.getItem(book.title);
            const parsedBook = JSON.parse(bookData);
            return parsedBook.weight === 0;
        });
        

        const lengths = bookList.map(async element => {
            //read the contents of folder element.bookPath with fs
            //add the length of each file to the weight
            

            const lengths = await Promise.all(await readDir(element.bookPath).then(async (res) => {
                const fileLengths = await (res.map(async (file) => {
                    if (file.isDirectory()) return 0;
                    const length = (await readFile(file.path, "base64")).length;
                    return length;
                }));
                return fileLengths;
            }))
            return lengths;
        });


        Promise.all(lengths).then((res) => {
            res.forEach(async (element, index) => {
                const total = element.reduce((a, b) => a + b, 0);
                const book = JSON.parse(await AsyncStorage.getItem(filteredBooks[index].title));
                const testUpdate = { ...book, weight: total };
                await AsyncStorage.setItem(filteredBooks[index].title, JSON.stringify(testUpdate));
            });
        });
    }

    const measure = async () => {
        const books = await AsyncStorage.getItem('books');
        const bookList = JSON.parse(books);
        const weights = bookList.map(async (book) => {
            const bookData = await AsyncStorage.getItem(book.title);
            const parsedBook = JSON.parse(bookData);
            return parsedBook.weight;
        });
        Promise.all(weights).then((res) => {
            const total = res.reduce((a, b) => a + b, 0);

            //KG
            const tempWeight = ((total / 3750) / 300) * 0.442;
            setWeight(tempWeight);
            //LBS
            //setWeight(((total / 3750) / 300) * 0.442 * 2.20462);
            setImage(weightPairs.find((item, index) => {
                if (index === weightPairs.length - 1) return true;
                return tempWeight < item.weight;
            }).image);
        });
    }

    useEffect(() => {
        weigh();
        measure();
    }, []);

    
    return (
        <View style={{flex: 1, flexDirection: "column", padding: 2, alignContent: "center", justifyContent: "center"}}>
            <Video source={image} repeat={false} useTextureView={true} style={{flex: 1, width: '80%', alignSelf: "center"}} resizeMode={"contain"}/>
            <Text style={{flex: 1, textAlign: "center", fontWeight: 40}}>Your books weigh {weight.toFixed(2)} kilograms!</Text>
        </View>
    );
}