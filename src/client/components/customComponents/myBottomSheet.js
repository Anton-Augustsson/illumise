import React, {useState, forwardRef} from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from "reanimated-bottom-sheet";
import Overlay from "./overlay";

const MyBottomSheet = forwardRef(({renderContent, snapPoints, 
    overlay = true, initialSnap = 1, ...props}, ref) => {

    const [overlayState, setOverlayState] = useState(false);

    const renderContentFunc = () => (
        <View style={{ overflow:"hidden",paddingTop:5}}>
            <View style={styles.bsContentContainer}>
                <View style={styles.bsHeaderContainer}>
                    <View style={styles.bsDrawIndicator}></View>
                </View>
                {renderContent}
            </View>
        </View>
    );

    return (
    <>
        <BottomSheet
            ref={ref}
            snapPoints={snapPoints}
            initialSnap={initialSnap}
            renderContent={renderContentFunc}
            enabledContentTapInteraction={false}
            onOpenStart={()=>setOverlayState(true)}
            onCloseEnd={()=>setOverlayState(false)}
            {...props}
        />

        {!overlay ? null :
            <Overlay
                onPress={()=>ref.current.snapTo(1)}
                state={overlayState}
                setState={setOverlayState}
            />
        }

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
        shadowOffset: {width:0.34, height:6.27},
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
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
    }
});