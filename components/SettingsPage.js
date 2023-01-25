import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Switch } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

import AsyncStorage from '@react-native-async-storage/async-storage'

import tw from "twrnc"




export default function SettingsPage() {

    const clearStorage = async () => {
        await AsyncStorage.clear();
    }

    return (
        <View >
            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
                <Text style={tw`flex-auto`}>Hide status bar while reading</Text>
                <Switch style={tw`flex-auto`} />
            </View>
            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
                <Text style={tw`flex-auto`}>Bottom Bar</Text>
                <Switch style={tw`flex-auto`} />
            </View>
            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
                <Text>Sleep delay</Text>
            </View>
            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
            <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-8 w-16`}>
                <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faArrowRotateLeft} />
            </TouchableOpacity>
            </View>
            <View style={tw`flex-row bg-white rounded-2 m-2 p-2`}>
            <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-8 w-16`}>
                <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faRefresh} onPress={clearStorage} />
            </TouchableOpacity>
            </View>
        </View>
    )
}

