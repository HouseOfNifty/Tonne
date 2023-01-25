import React from "react";
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faX } from '@fortawesome/free-solid-svg-icons';

import Styles from '../Styles.tsx';
import appMenu from '../images/menuIcon.png';
import tw from "twrnc";

export default function InBookMenu(props) {

    return (
        <View style={{...Styles.inBookMenu}}>

                <FlatList data={props.chapters} renderItem={({ item }) => <TouchableOpacity onPress={() => {props.setCurrFileRef(item.number); props.selfRef();}}>
                    <Text style={tw`text-xl m-1 text-zinc-500`}>{item.title}</Text>
                </TouchableOpacity>} />

            <View style={tw`flex w-full flex-row bottom-0 justify-between items-center py-4 bg-yellow-400 rounded-b-lg`}>
                <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-8 w-16`} onPress={props.toShowRef}>
                    <Image source={appMenu} style={Styles.imageIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-8 w-16`} >
                    <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faX} onPress={props.selfRef}/>
                </TouchableOpacity>

            </View>
        </View>
    );
}