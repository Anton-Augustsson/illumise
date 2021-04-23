import {StyleSheet} from 'react-native';
import {colors} from "../../../mainStyles/colors"


const rs = StyleSheet.create({
    content: {
        flex:1,
        paddingRight:20,
        paddingLeft:20,
        paddingBottom:20,
    },
    moveOnContainer: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight:20,
        paddingLeft:20,
    },
    moveOnContainer2: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection:"row",
        justifyContent:"space-evenly",
        paddingRight:20,
        paddingLeft:20,
    },
    scrollDown: {
        alignSelf:"center",
        alignItems:"center",
        marginTop:"40%",
    },
    desc: {
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderWidth:2,
        borderStyle:"solid",
        borderColor:colors.INPUT_BORDER,
        borderRadius:10,
        textAlignVertical: "top",
        marginTop:5,
        marginBottom:5,
    },
    usualArticleContainer: {
        overflow:"hidden",
        backgroundColor:"white",
        elevation:5,
        borderRadius:10,
        marginTop:10,
    },
    usualArticleInnerContainer: {
        padding:10,
    },
    usualArticleItemContainer: {
        flexWrap:"wrap",
        flexDirection:"row",
        paddingBottom:5,
        paddingRight:5,
    },
    usualArticle: {
        backgroundColor: "#CCCCCC",
        borderWidth:1,
        borderColor:"#CCCCCC",
        alignSelf:"flex-start",
        alignItems:"center",
        padding:7,
        borderRadius:10,
        minWidth:45,
        marginLeft:7,
        marginTop:7,
    },
    usualArticleExpand: {
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        width:"100%",
        height:35,
        backgroundColor:"rgba(0,0,0,0.5)",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
    usualArticleCategory: {
        width:"100%",
        borderBottomWidth:1,
        borderColor:"grey",
        padding:5,
    },
    multiLinetextInput: {
        minHeight:100,
        maxHeight:250,
        textAlignVertical:"top",
        paddingTop:10,
        paddingBottom:10,
    },
    
});

export default rs;