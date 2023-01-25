import React, { useEffect } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';



export default function GridItem(props) {


    //set the current book to the book that was clicked
    //navigate to the page view

  
    function clickBook(){
        props.clickBook(props.title);
    }

    return (
        <TouchableOpacity title="Book Button" onPress={clickBook} style={tw`border border-white rounded-xl p-2 m-2 text-black bg-white`}>
            <Image style={tw`items-start w-2/4 h-50 border rounded-xl`} source={{uri: "file://" + props.cover}}  />
            <View style={tw`items-end`}>
                <Text style={tw`text-zinc-500`}>{props.title}</Text>
                <Text style={tw`text-zinc-500`}>{props.author}</Text>
                
            </View>
        </TouchableOpacity>
    )




}