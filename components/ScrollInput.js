import React from "react";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, FlatList } from "react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AlertBox(props) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const [clicked, setClicked] = useState(false);
    const [currentDelay, setCurrentDelay] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem("delay").then((value) => {
            if (value != null) {
                setCurrentDelay(JSON.parse(value));
            }
        });
    }, []);

    const setDelay = (delay) => {
        AsyncStorage.setItem("delay", delay).then(() => {
            setCurrentDelay(delay);
            setClicked(false);
        });
    };

    const click = () => {
        setClicked(true);
    };

    return (<>
        {!clicked ? <TouchableOpacity onPress={click}><Text style={tw`text-zinc-500`}>{currentDelay}</Text></TouchableOpacity> :
            <FlatList style={tw`h-15`} data={numbers} renderItem={(item) =>
                <>
                <TouchableOpacity onPress={() => setDelay(item.item)}>
                    <Text style={tw`text-zinc-500`}>{item.item}</Text>
                </TouchableOpacity>
                </>
            }>

            </FlatList>
            
        }
        <Text style={tw`flex-auto text-zinc-500 text-right ml-auto mr-0`}>minute{currentDelay > 1 ? "s" : ""}</Text>
    </>
    );
}