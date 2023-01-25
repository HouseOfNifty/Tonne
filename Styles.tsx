import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
    textBox: {
      height: '96%',
      width: '100%',
      position: 'relative',
      backgroundColor: '#000000',
      padding: 15,
      color: "#FFFFFF"
      
    },
    pageNum: {
      color: "#FFFFFF",
      textAlign: 'center'
    },
    pageBack: {
      
      width: '33%',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      elevation: 30,
      opacity: 0,
      backgroundColor: 'red',
      height: '100%',
      zIndex: 100,
      margin: 0,
      
    },
    pageForward: {
      
      width: '33%',
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      height: '100%',
      backgroundColor: 'blue',
      opacity: 0,
      zIndex: 100,
      
    },

    returnButton: {
      width: '33%',
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      height: '100%',
      backgroundColor: 'green',
      opacity: 0,
      zIndex: 100,
      
    },

    
    // Just in case we want to use the chapter buttons again
    // chapterForward: {
    //   width: '30%',
    //   position: 'absolute',
    //   right: 0,
    //   bottom: 0,
    //   elevation: 20,
    //   backgroundColor: 'orange',
    //   opacity: 0,
    //   zIndex: 200,
    //   height: 500,
    // },

    // chapterBack: {
      
    //   width: '30%',
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
    //   elevation: 30,
    //   opacity: 0,
    //   backgroundColor: '#0F0FFF',
    //   zIndex: 200,
    //   height: 500,
    // },

    // chapterForwardLow: {
    //   zIndex: -1,
    //   backgroundColor: 'yellow',
    //   height: '100%',
    //   width: '30%',
    //   position: 'absolute',
    //   right: 0,
    //   bottom: 0,
    //   top: 0,
    //   opacity: 0,
    // },

    // chapterBackLow: {
    //   zIndex: -1,
    //   backgroundColor: 'yellow',
    //   height: '100%',
    //   width: '30%',
    //   position: 'absolute',
    //   left: 0,
    //   bottom: 0,
    //   top: 0,
    //   opacity: 0,
    // },


    centerButton: {
      position: 'absolute',
      opacity: 0,
      left: '30%',
      right: '30%',
      justifyContent:'center',
      top: 0,
      bottom: 0,
      elevation: 30,
      backgroundColor: '#FFFf00',
      flex: 1
    },
    container: {
      paddingTop: StatusBar.currentHeight || 0,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      height: '100%',
      width: '100%',
      flex: 3
    },
  
    item: { padding: 16,
      fontSize: 11,
      backgroundColor: 'black',
      color: 'white',
      flex:1,
      marginVertical: 14,
      
    },
  
    button: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      padding: 2,
      marginVertical: 3,
    },
    controlView: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
    },
    pageView: {
      height: '100%',
      width: '100%',
      zIndex: 100
    },


    inBookMenu: {
      height: "80%",
      width: "80%",
      backgroundColor: "white",
      position: "absolute",
      top: "10%",
      left: "10%",
      zIndex: 200,
      borderRadius: 10,
      elevation: 500,
    },

    imageIcon: {
      width: 50,
      height: 50,
    },

    loadingCover: { 
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
      zIndex: 500,
      alignContent: 'center',
      justifyContent: 'center',
    },

  });