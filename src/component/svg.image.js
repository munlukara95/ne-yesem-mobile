import React from 'react';
import {StyleSheet, View} from "react-native";

const SvgImage = ({width, height, Svg}) => {
    return(
        <View style={{width: width, height: height, ...styles.imageContainer}}>
            <Svg width={100 + '%'} height={100 + '%'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default SvgImage;
