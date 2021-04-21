import {StyleSheet} from 'react-native';
import {colors} from "../../../mainStyles/colors"


const rs = StyleSheet.create({
    content: {
        flex:1,
        paddingTop:5,
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
    moveOnContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    bsContentContainer: {
        backgroundColor:"#FFFFFF",
        height:"100%",
        paddingTop:5,
        paddingBottom:10,
    },
    bsHeaderContainer: {
        backgroundColor:"#FFFFFF",
        height:20,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        shadowColor: "#333333",
        shadowOffset: {width:-1, height:-3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation:10,
    },
    bsHeaderCross: {
        position:"absolute",
        right:10,
    },
    bsDrawIndicator: {
        backgroundColor:"grey",
        width:50,
        height:6,
        borderRadius:3,
    },
    usualArticleContainer: {
        overflow:"hidden",
        backgroundColor:"white",
        elevation:5,
        borderRadius:10,
        marginTop:10,
    },
    usualArticleInnerContainer: {
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
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
        padding:4,
        borderRadius:10,
        minWidth:45,
        marginLeft:6,
        marginTop:6,
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
    
});

export default rs;