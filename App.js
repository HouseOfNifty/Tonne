import React, { useState } from 'react'
import { LogBox, View, BackHandler } from 'react-native'
import tw from 'twrnc'

import HomeGrid from './components/HomeGrid'
import UtilityBar from './components/UtilityBar';
import TextArea from './components/TextArea'
import SettingsPage from './components/SettingsPage'
import WeightPage from './components/Weight'

import AsyncStorage from '@react-native-async-storage/async-storage';

//TODO: replace the upperRef thing with some state manager
export default function App() {

    const [toShow, setToShow] = useState("shelf");
    const [showUtils, setShowUtils] = useState(true)
    const [currentBook, setCurrentBook] = useState({});
    
    const handleBack = () => {
        if (toShow === "page") {
            setToShow("shelf");
            setShowUtils(true);
            return true;
        }
        return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBack);

    async function showSettings() {

        if (toShow == "settings") {
            setToShow("shelf");
        }
        else {
            setToShow("settings");
        }
    }

    function clickBook (book) {
        AsyncStorage.getItem(book).then((foundBook)=>{
            setCurrentBook(JSON.parse(foundBook));
            setShowUtils(false);
            setToShow("page");
            
        })
    }
    LogBox.ignoreAllLogs(true);
    //        <View style={tw`w-full h-full bg-yellow-400`}>
    //<View style={tw`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>

    const exitBook = () => {
        setToShow("shelf"); setShowUtils(true);
    };

    return (
        <View style={toShow == "page" ? tw`flex w-full h-full bg-black` : tw`flex w-full h-full bg-yellow-400`}>

            {toShow == "shelf" && <HomeGrid clickBook={clickBook}/>}
            {toShow == "page" && currentBook && <TextArea currentBook={currentBook} toShowRef={exitBook}/>}
            {toShow == "settings" && <SettingsPage />}
            {toShow == "weight" && <WeightPage />}
            {showUtils && <UtilityBar upperRef={setToShow} setCurrentBook={setCurrentBook} settingsRef={showSettings} showUtils={setShowUtils}/>}
        </View>
    )

}