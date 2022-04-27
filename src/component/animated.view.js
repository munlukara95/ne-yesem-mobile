import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';

const AnimatedView = ({width, height, children, style}) => {
    const [animateValue, setAnimateValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.spring(animateValue,
            {
                toValue: 1,
                friction: 1.7,
                tension: 0.1,
                useNativeDriver: true
            }
        ).start(() => setAnimateValue(new Animated.Value(0)));
    }, [animateValue]);

    return (
        <Animated.View collapsable={false} style={{...style, height:height, width:width, transform: [{scale: animateValue}]}}>
            {children}
        </Animated.View>
    );
};

export default AnimatedView;
