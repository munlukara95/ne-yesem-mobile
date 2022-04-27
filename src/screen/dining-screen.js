import React, {Fragment, useCallback, useState} from 'react';
import {SafeAreaView, View} from "react-native";
import DiningBar from "../component/dining-bar";
import {useDisclose} from "native-base";
import ActionSheetDiningScreen from "../component/actionsheet.dining-screen";
import {findAllMeal} from "../service/local-storage.service";
import EmptyBodyDiningScreen from "../component/empty-body.dining-screen";
import MealsCardBodyDiningScreen from "../component/meals-card-body.dining-screen";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ActionSheetTypes from "../type/actionsheet-types";
import FocusAwareStatusBar from "../component/focus-aware-status-bar";
import {useFocusEffect} from "@react-navigation/native";

const DiningScreen = () => {
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const [isLoaded, setIsLoaded] = useState(false);
    const [mealsData, setMealsData] = useState([
        {id: 1, beginning: '', main: '', sides: []},
        {id: 2, beginning: '', main: '', sides: []},
        {id: 3, beginning: '', main: '', sides: []},
        {id: 4, beginning: '', main: '', sides: []},
        {id: 5, beginning: '', main: '', sides: []},
        {id: 6, beginning: '', main: '', sides: []},
        {id: 7, beginning: '', main: '', sides: []},
        {id: 8, beginning: '', main: '', sides: []}
    ]);
    const [actionSheetType, setActionSheetType] = useState(ActionSheetTypes.ADD);
    const [willUpdateMeal, setWillUpdateMeal] = useState(null);

    useFocusEffect(
        useCallback(() => {
            async function getMealsData(){
                if(!isOpen || actionSheetType === ActionSheetTypes.DELETE){
                    const meals = await findAllMeal();
                    setMealsData(meals);
                    setTimeout(() => {
                        setIsLoaded(true);
                    }, 1000);
                }
                else {
                    setIsLoaded(false);
                }
            }

            getMealsData();
        }, [isOpen, actionSheetType])
    )

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'tomato'}} />
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <FocusAwareStatusBar backgroundColor={'tomato'} barStyle={'light-content'} />
                <View style={{ flex: 2, width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                    <DiningBar onOpen={onOpen}/>
                    <ActionSheetDiningScreen isOpen={isOpen} onClose={onClose} type={actionSheetType} meal={willUpdateMeal}/>
                    {mealsData.length === 0
                        ? <EmptyBodyDiningScreen />
                        : <GestureHandlerRootView>
                            <MealsCardBodyDiningScreen
                                mealsData={mealsData}
                                isLoaded={isLoaded}
                                onOpen={onOpen}
                                type={actionSheetType}
                                setActionSheetType={setActionSheetType}
                                setWillUpdateMeal={setWillUpdateMeal}
                                isOpen={isOpen}
                            />
                        </GestureHandlerRootView>
                    }
                </View>
            </SafeAreaView>
        </Fragment>
    );
}

export default DiningScreen;
