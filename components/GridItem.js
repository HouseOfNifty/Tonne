import React, { useState } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from 'react-native-fs';

export default function GridItem(props) {

    const [showDeleteControl, setShowDeleteControl] = useState(false);
  
    function clickBook(){
        props.clickBook(props.title);
    }

    function showDelete(){
        setShowDeleteControl(!showDeleteControl);
    }

    function deleteBook(){
        AsyncStorage.removeItem(props.title);
        AsyncStorage.getItem('books').then((value) => {
            let books = JSON.parse(value);
            books = books.filter((book) => book.title != props.title);
            AsyncStorage.setItem('books', JSON.stringify(books));
            
        });
        fs.unlink(props.path);
        props.booksRef([]);
    }

    return (
        <TouchableOpacity title="Book Button" onPress={clickBook} onLongPress={showDelete} style={tw`border border-white rounded-xl p-2 m-2 text-black bg-white`}>
            <Image style={tw`items-start w-2/4 h-50 border rounded-xl`} source={{uri: "file://" + props.cover}}  />
            <View style={tw`items-end`}>
                <Text style={tw`text-zinc-500`}>{props.title}</Text>
                <Text style={tw`text-zinc-500`}>{props.author}</Text>
                {showDeleteControl && <TouchableOpacity style={tw`border-red-500 rounded m-2 p-2 bg-red-500 text-white`} onPress={deleteBook}><Text style={tw`text-zinc-500`}>Delete</Text></TouchableOpacity>}
            </View>
        </TouchableOpacity>
    )




}