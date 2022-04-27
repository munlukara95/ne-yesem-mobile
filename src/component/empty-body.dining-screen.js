import React from 'react';
import {View} from "react-native";
import Inbox from "../../public/icon/inbox.svg";

function EmptyBodyDiningScreen() {
    return(
        <View style={{ width: '100%', height: '100%', flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <Inbox width={'10%'} height={'10%'} fill={'#cccccc'}/>
        </View>
    );
}

export default EmptyBodyDiningScreen;
