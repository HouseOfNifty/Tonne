import React from "react"
import HTMLView from "react-native-htmlview";

export default HTMLRenderer = React.memo(function HTMLRenderer({height = 25, currText}){


    return(
        <HTMLView value={currText} textComponentProps={{style: {color: "white", lineHeight: height}}} />
    )
});