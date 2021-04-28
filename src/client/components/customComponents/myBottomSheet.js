import React, {useState, forwardRef} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from "reanimated-bottom-sheet";
import {colors} from "../mainStyles/colors";

const MyBottomSheet = forwardRef((props, ref) => {

    const renderContent = () => (
        <View style={{ overflow:"hidden",paddingTop:5}}>
            <View style={styles.bsContentContainer}>
                <View style={styles.bsHeaderContainer}>
                    <View style={styles.bsDrawIndicator}></View>
                </View>
                {props.renderContent}
            </View>
        </View>
    );

    const [overlay, setOverlay] = useState(false);

    return (
    <>
        <BottomSheet
            ref={ref}
            snapPoints={props.snapPoints}
            initialSnap={1}
            renderContent={renderContent}
            enabledContentTapInteraction={false}
            onOpenStart={()=>setOverlay(true)}
            onCloseEnd={()=>setOverlay(false)}
        />

        <View style={[styles.overlayOuter,{zIndex:overlay ? 10 : -100}]}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.overlayInner, {display: overlay ? "flex" : "none"}]}
                onPress={()=>{
                setOverlay(false);
                ref.current.snapTo(1);
                }}
            />
        </View>

    </>
    )

})

export default MyBottomSheet;

const styles = StyleSheet.create({
    bsContentContainer: {
        backgroundColor:"#FFFFFF",
        height:"100%",
        zIndex:100000,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        shadowColor: "#333333",
        shadowOffset: {width:-1, height:-3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation:10,
        zIndex:100000,
    },
    bsHeaderContainer: {
        height:25,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    bsDrawIndicator: {
        backgroundColor:"grey",
        width:50,
        height:6,
        borderRadius:3,
    },
    overlayOuter: {
        position:"absolute",
        height:"100%",
        width:"100%",
        top:0,
        right:0,
        left:0,
        bottom:0,
    },
    overlayInner: {
        flex:1,
        backgroundColor:colors.OVERLAY,
    },
});