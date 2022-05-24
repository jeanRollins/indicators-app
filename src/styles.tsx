import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR_PRIMARY, TEXT_COLOR_PRIMARY } from './stylesVar';

export const styles = StyleSheet.create({
    container : {
        paddingLeft: 22,
        paddingRight: 22 
    },
    bg: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_PRIMARY
    },
    titleContent :{
        alignItems: 'center',
        marginVertical: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30 ,
        color: TEXT_COLOR_PRIMARY
    },
    titleValue: {
        fontWeight: 'bold',
        fontSize: 20 ,
        color: TEXT_COLOR_PRIMARY
    },
    textSelected: {
        fontWeight: 'bold'
    },
    selected : {
        alignItems: "center",
        backgroundColor: BACKGROUND_COLOR_PRIMARY,
        padding: 14,
        margin: 10,
        borderWidth: 0.7,
        borderRadius: 5
    },
    input: {
        height: 40,
        width: "100%",
        borderWidth: 0.8,

        borderRadius: 6,
        marginTop: 10,
        borderColor: TEXT_COLOR_PRIMARY
    },
    label: {
        marginTop: 50,
        fontSize: 17,
        color: TEXT_COLOR_PRIMARY
    }

}) ;