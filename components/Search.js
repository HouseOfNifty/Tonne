import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

export default function SearchBar(props){



    return(
            <TextInput style={tw`border border-white w-auto rounded-xl p-2 m-2 text-zinc-500 bg-white`} placeholder="Search" onChangeText={props.searchRef}/>
    )
}