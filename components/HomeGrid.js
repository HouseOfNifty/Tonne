
import React, { useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import tw from 'twrnc'
import AsyncStorage from '@react-native-async-storage/async-storage';
import GridItem from "./GridItem";
import SearchBar from './Search';

export default function HomeGrid(props){
    //{title: "Test Book", uri : "", coverUri : "", author : "Test Author"}
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    function loadBooks(){
        const asyncStorageBooks = AsyncStorage.getItem('books');
        asyncStorageBooks.then((value) => {

            setBooks(JSON.parse(value));
        });
    }

    useEffect(()=>{
        loadBooks();
    }, [books])

    return(
       
        books != null && books.length > 0 ? 
        <View style={tw`flex-auto`}>
            <SearchBar searchRef={setSearch}/>
            <FlatList style={tw`w-full`} data={books.filter((book) => book.title.includes(search) || book.author.includes(search))} renderItem={({item}) => <GridItem key={item.title} title={item.title} author={item.author} clickBook={props.clickBook} cover={item.cover} path={item.bookPath} booksRef={setBooks}/>} />
            <View style={{height: 100}}></View>
        </View>
        :
        <></>
    )
}