import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons/faWeightHanging'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear/'
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook'
import openBook from './OpenBook'
import { pickSingle } from "react-native-document-picker";
import tw from 'twrnc'

export default function UtilityBar(props) {


    const showShelf = () => {
        props.upperRef("shelf")
    }

    const openNewFile = async () => {
        const res = await pickSingle();
        const book = await openBook(res);
        props.setCurrentBook(book);
        props.upperRef("page");
        props.showUtils(false);

    }

    return (<View style={tw`absolute bottom-0`}>

        <View style={{ ...tw`flex w-full flex-row bottom-0 justify-between items-center py-4 bg-yellow-400`, elevation: 20 }}>
            <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-4`} onPress={showShelf}>
                <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faBook} />
            </TouchableOpacity>
            <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-4`} onPress={openNewFile}>
                <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faFolderOpen} />
            </TouchableOpacity>
            <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-4`}>
                <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faWeightHanging} onPress={() => props.upperRef("weight")} />
            </TouchableOpacity>
            <TouchableOpacity style={tw`border-white bg-white rounded-2 p-2 mx-4`} onPress={props.settingsRef}>
                <FontAwesomeIcon size={50} color={'rgb(251, 191, 36)'} icon={faGear} />
            </TouchableOpacity>
        </View>
    </View>)
}