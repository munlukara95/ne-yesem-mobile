import React, {useEffect, useState} from "react";
import AnimatedView from "./animated.view";
import SvgImage from "./svg.image";

import Logo from '../../public/icon/shuffled-meal.svg';
import {StatusBar, StyleSheet, Text, View} from "react-native";

const WAIT_FOR_APP_TO_BE_READY = "Wait for app to be ready";
const HIDDEN = "Hidden";

const Splash = ({ isAppReady }: { isAppReady: boolean }) => {

    const [state, setState] = useState(WAIT_FOR_APP_TO_BE_READY);

    useEffect(() => {
        if (isAppReady) {
            setState(HIDDEN);
        }

    }, [isAppReady]);

    if (state === HIDDEN) return null;

    return (
        <View style={[style.wrapper]}>
            <StatusBar backgroundColor={'tomato'} barStyle={'light-content'} />
            <AnimatedView width={30 + '%'} height={30 + '%'} style={[style.container]}>
                <SvgImage width={100 + '%'} height={100 + '%'} Svg={Logo} />
            </AnimatedView>
            <View style={[style.bottomContainer]}>
                <Text style={[style.textBrand]}>Sofrax</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FF6347',
        alignItems: "center",
        justifyContent: "center",
    },
    wrapper: {
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    textBrand: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold'
    },
});

export default Splash;
