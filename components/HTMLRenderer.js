import React from "react"
//import RenderHtml from 'react-native-render-html';
//import { WebView } from 'react-native-webview';
import HTMLView from "react-native-htmlview";

export default HTMLRenderer = React.memo(function HTMLRenderer({width, currText}){
    //            <RenderHtml renderToHardwareTextureAndroid={true} baseStyle={{ color: "white", height: "100%", backgroundColor: "black" }} contentWidth={width} source={{ html: currText }} />
    //<WebView style={{backgroundColor: "black", height: "100%"}} source={{ html: currText }} />
    //
    return(
        <HTMLView value={currText} textComponentProps={{style: {color: "white"}}} />
    )
});