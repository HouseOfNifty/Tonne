import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StatusBar, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from 'react-native-fs';
import tw from "twrnc";
import { setIdleTimerDisabled } from 'react-native-idle-timer';
import ScrollInput from './ScrollInput';
/* 

<View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
<TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-8 w-16`}>
                <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faArrowRotateLeft} />
            </TouchableOpacity>
            </View> 
            
<View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
                <Text style={tw`flex-auto text-zinc-500`}>Bottom Bar</Text>
                <Switch style={tw`flex-auto`} />
            </View>            
*/

export default function SettingsPage() {

    const [topBar, setTopBar] = useState(false);
    const [keepAwake , setKeepAwake] = useState(false);
    const [workoutMode, setWorkoutMode] = useState(false);

    useEffect(() => {
        const asyncStorageTopBar = AsyncStorage.getItem('topBar');
        asyncStorageTopBar.then((value) => {
            setTopBar(value == "true");
            StatusBar.setHidden(value == "true");
        });
        const asyncStorageKeepAwake = AsyncStorage.getItem('keepAwake');
        asyncStorageKeepAwake.then((value) => {
            setKeepAwake(value == "true");
            setIdleTimerDisabled(value == "true");
        });
        const asyncStorageWorkoutMode = AsyncStorage.getItem('workoutMode');
        asyncStorageWorkoutMode.then((value) => {
            setWorkoutMode(value == "true");
        });

    }, []);

    const clearStorage = async () => {
        await AsyncStorage.clear();
        //delete everything in the books folder
        fs.readDir(fs.DocumentDirectoryPath).then((result) => {
            result.forEach((file) => {
                fs.unlink(file.path);
            });
        });
    }

    const setBar = (e) => {
        setTopBar(e.nativeEvent.value);
        StatusBar.setHidden(e.nativeEvent.value);
        AsyncStorage.setItem('topBar', e.nativeEvent.value.toString());
    }

    const setAwake = (e) => {
        setKeepAwake(e.nativeEvent.value);
        AsyncStorage.setItem('keepAwake', e.nativeEvent.value.toString());
        setIdleTimerDisabled(e.nativeEvent.value);
    }

    const setWorkout = (e) => {
        setWorkoutMode(e.nativeEvent.value);
        AsyncStorage.setItem('workoutMode', e.nativeEvent.value.toString());
    }

    return (
        <View >
            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
                <Text style={tw`flex-auto text-zinc-500`}>Hide top bar</Text>
                <Switch style={tw`flex-auto`} onChange={setBar} value={topBar}/>
            </View>
            
            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
                <Text style={tw`flex-auto text-zinc-500`}>Keep awake</Text>
                <Switch style={tw`flex-auto`} onChange={setAwake} value={keepAwake}/>
            </View>




            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
                <Text style={tw`flex-auto text-zinc-500`}>Clear storage</Text>
                <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-8 w-16`}>
                    <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faRefresh} onPress={clearStorage} />
                </TouchableOpacity>
            </View>

            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
                <Text style={tw`flex-auto text-zinc-500`}>Repeating set timer</Text>
                <ScrollInput/>
                <Switch style={tw`flex-auto`} onChange={setWorkout} value={workoutMode}/>
            </View>
        </View>
    )
}

