import React from "react"
import HTMLView from "react-native-htmlview";

export default HTMLRenderer = React.memo(function HTMLRenderer({height, currText}){


    return(
        <HTMLView value={currText} textComponentProps={{style: {color: "white", lineHeight: height, marginBottom: height}}} />
    )
});