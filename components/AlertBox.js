import React from "react";
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";

export default function AlertBox(props) {

    const slideAnim = useRef(new Animated.Value(-200)).current;

    const [sets, setSets] = useState(0);
    const [delay, setDelay] = useState(0);

    const slideIn = () => {
        setSets((sets) => sets + 1);
        Animated.timing(slideAnim, {
            toValue: 50,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: -200,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    useEffect(() => {
        AsyncStorage.getItem("workoutMode").then((workout) => {
            if (workout == "true") {
                AsyncStorage.getItem("delay").then((value) => {
                    if (value != null && value != 0) {
                        setDelay(value);
                        setTimeout(() => {
                            slideIn();
                        }, value * 60000);
                    }
                });
            };
        });
        }, []);

        const cancel = () => {
            slideOut();
            AsyncStorage.setItem("workoutMode", "false");
        }

        const restart = () => {
            slideOut();
            setTimeout(() => {
                slideIn();
            }, delay * 60000);
        }
        //const style = { display: visible ? 'flex' : 'none' };
        const style = { display: 'flex', position: "absolute", top: "50%", flexDirection: "column", border: "solid", borderRadius: 20, backgroundColor: "white", justifyContent: 'space-between', alignItems: 'center', padding: 20, transform: [{ translateX: -70 }, { translateY: -50 }], zIndex: 500, elevation: 1000 }


        return (<Animated.View style={[style, { left: slideAnim }]}>
            <Text style={tw`ml-4 text-zinc-500`}>You've done {sets} set{sets > 1 ? "s" : ""}</Text>
            <View style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}>
                <TouchableOpacity onPress={restart}>
                    <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faRefresh} />
                </TouchableOpacity>
                <TouchableOpacity onPress={cancel}>
                    <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faX} />
                </TouchableOpacity>
            </View>
        </Animated.View>)

    }