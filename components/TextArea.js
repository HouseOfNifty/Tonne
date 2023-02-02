import React, { useEffect, useRef, useContext, useState } from 'react'
import { View, ActivityIndicator, useWindowDimensions, ScrollView, TouchableWithoutFeedback, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import InBookMenu from './InBookMenu';
import styles from '../Styles';
import ReactNativeBlobUtil from 'react-native-blob-util';
import HTMLRenderer from './HTMLRenderer';
import { setIdleTimerDisabled } from 'react-native-idle-timer';
import AlertBox from './AlertBox';

export default function TextArea(props) {


    const { width, height } = useWindowDimensions();

    const [currPos, setCurrPos] = useState(0);
    //is this needed? isnt it in the book?
    const [bookLength, setBookLength] = useState(0);

    const [currFile, setCurrFile] = useState(5);
    const [currText, setCurrText] = useState("");
    const [viewHeight, setViewHeight] = useState(0);

    const pageRef = useRef(null);
    const viewRef = useRef(null);

    //resets the currpos when you go back a page
    const [needReset, setNeedReset] = useState(false);

    const [showMenu, setShowMenu] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const changeFile = async (direction) => {
        if (direction === "back") {
            if (currFile >= 0) {
                setCurrFile((prev) => prev - 1);
            }
        } else {
            if (currFile < bookLength - 1) {
                setCurrPos(0);
                setCurrFile((prev) => prev + 1);
            }
        }
        //write the updated currFile to the book
    }
    //function to translate the page up and down by the page height
    const scrollPage = async (direction) => {
        //get the current position of the page
        const pageHeight = height; // - StatusBar.currentHeight;
        //why are these different from each other
        if (direction == "up") {
            if (currPos - pageHeight < -viewHeight) {
                await changeFile("forward");
                viewRef.current.scrollTo({ x: 0, y: 0, animated: false });
                updateBook(0);
                return;
            }

            setCurrPos((prev) => prev - pageHeight);
            viewRef.current.scrollTo({ x: 0, y: -currPos + pageHeight, animated: true });
            updateBook(currPos - pageHeight);
        } else {
            if (currPos + pageHeight > 0) {
                if (currPos == 0) {
                    await changeFile("back");
                    viewRef.current.scrollToEnd({ animated: false });
                    setNeedReset(true);
                }
                else {
                    setCurrPos(0);
                    viewRef.current.scrollTo({ x: 0, y: 0, animated: true });
                }

                return;
            } else {
                //add a state so it goes to the end then next on the next tap
                setCurrPos((prev) => prev + pageHeight);
                viewRef.current.scrollTo({ x: 0, y: -currPos - pageHeight, animated: true });
                updateBook(currPos + pageHeight);
            }
        }
    }

    //useEffect to load the book
    useEffect(() => {
        if (props.currentBook != null) {
            loadBook();
        }
    }, [props.currentBook]);


    async function updateBook(offset) {
        const bookString = props.currentBook.title + "";
        await AsyncStorage.mergeItem(bookString, JSON.stringify({ currFile: currFile, currPos: offset }));
    }


    //change the currfile first
    const loadFile = async () => {
        setShowLoader(true);
        const toRead = props.currentBook.files[currFile].path;
        const fileContents = await ReactNativeBlobUtil.fs.readFile(toRead, "utf8");
        setBookLength(props.currentBook.files.length);
        setCurrText(()=>{setShowLoader(false); return fileContents});

    }

    const loadBook = async () => {
        if (props.currentBook) {

            const bookString = props.currentBook.title + "";
            const book = await AsyncStorage.getItem(bookString);
            const jsonBook = JSON.parse(book);
            setCurrFile(jsonBook.currFile);
            setBookLength(jsonBook.files.length);
            setCurrPos(() => { viewRef.current.scrollTo({ x: 0, y: -jsonBook.currPos, animated: false }); return jsonBook.currPos });


        };
    }
    //we possibly need a context here with this menu

    const closeSelf = () => {
        setShowMenu(false);
    }

    const scrollDown = () => {
        scrollPage("down");
    }

    const scrollUp = () => {
        scrollPage("up");
    }

    const openMenu = () => {
        updateBook(currPos);
        setShowMenu(true)
    }

    const setCurrFileFunc = (file) => {
        setCurrPos(0);
        setCurrFile(file);
        viewRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }

    const handleLayout = (e) => {
        setViewHeight(e.nativeEvent.layout.height);
        if (needReset) {
            setCurrPos(-e.nativeEvent.layout.height);
            setNeedReset(false);
            viewRef.current.scrollToEnd({ animated: false });
        }
    }

    useEffect(() => {
        if (props.currentBook != null) {
            loadFile();
            AsyncStorage.getItem("keepAwake").then((value) => {
                if (value == "true") {
                    setIdleTimerDisabled(true);
                }
                else{
                    setIdleTimerDisabled(false);
                }
            });

            AsyncStorage.getItem("delay").then((value) => {
                if (value != null && value != "0") {
                    setTimeout(() => {
                        setShowAlert(true);
                    }, value * 60000);
                }
            });
        };
    }, [currFile]);

    //<HTMLRenderer width={width} currText={currText} />
    //<Text style={{color: "white"}}>{currText}</Text>
    return (
        <View>
            <AlertBox />
            {showMenu && <InBookMenu chapters={props.currentBook.chapters} selfRef={closeSelf} toShowRef={props.toShowRef} setCurrFileRef={setCurrFileFunc} />}
            <ScrollView ref={viewRef} style={{ height: "100%" }} scrollEnabled={true} renderToHardwareTextureAndroid={true}>

                <HTMLRenderer width={height ? height : 600} currText={currText} />

                <TouchableWithoutFeedback onPress={scrollDown}><View style={styles.pageBack} ref={pageRef} onLayout={handleLayout}></View></TouchableWithoutFeedback>
            </ScrollView>
            <TouchableWithoutFeedback onPress={openMenu}><View style={{ ...styles.returnButton, transform: [{ translateX: -width / 3 }] }}></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={scrollUp}><View style={styles.pageForward}></View></TouchableWithoutFeedback>
            {showLoader && <View style={styles.loadingCover}><ActivityIndicator size="large"/></View>}
        </View>
    )
}
