import { StyleSheet } from "react-native"
import { COLORS } from "./themes"


export const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent :'center',
        alignItems : 'center'
    }, 
    button : {
        backgroundColor : COLORS.surface,
        justifyContent: 'center',
        alignItems : 'center',
        width : '90%',
        padding : 10,
        borderRadius : 20,
        textAlign : 'center',
        margin : 2
    }, 
    text : {
        color : COLORS.primary,
        fontFamily : 'Poppins',
        fontSize : 20,
        fontWeight : 'bold'
    }
})
