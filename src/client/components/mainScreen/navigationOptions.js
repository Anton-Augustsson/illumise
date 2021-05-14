import React from "react";
import CustomHeader from "../customComponents/customHeader";
import {colors} from "../mainStyles/colors";

export const screenOptions = {
    header: props => <CustomHeader {...props}/>,
    cardStyle:{backgroundColor:colors.DEFAULT_BACKGROUND}
}