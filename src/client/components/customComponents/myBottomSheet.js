import React, {useState, forwardRef} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from "reanimated-bottom-sheet";
import {colors} from "../mainStyles/colors";

const MyBottomSheet = forwardRef((props, ref) => {
    const renderHeader = () => (
        <View style={{overflow:"hidden", paddingTop:5}}>
            <View style={styles.bsHeaderContainer}>
                <View style={styles.bsDrawIndicator}></View>
            </View>
        </View>
    );

    const renderContent = () => (
        <View style={styles.bsContentContainer}>
            {props.renderContent}
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
                renderHeader={renderHeader}
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
        paddingTop:5,
        zIndex:100000,
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
        zIndex:100000,
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