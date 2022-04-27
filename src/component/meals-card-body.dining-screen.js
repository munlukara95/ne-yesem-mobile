import React, {useEffect, useRef, useState} from 'react';
import {View} from "react-native";
import {Box, Center, ScrollView} from "native-base";
import MenuCard from "./menu-card";
import {Swipeable} from "react-native-gesture-handler";
import Trash from '../../public/icon/trash.svg'
import Edit from '../../public/icon/edit.svg'
import SwipeTypes from "../type/swipe-types";
import ActionSheetTypes from "../type/actionsheet-types";
import {removeMeal} from "../service/local-storage.service";

function MealsCardBodyDiningScreen({mealsData, isLoaded, onOpen, setActionSheetType, setWillUpdateMeal, isOpen, type}) {

    const refs = useRef([]);
    const [selectedRowNdx, setSelectedRowNdx] = useState(-1);

    useEffect(() => {
        if((!isOpen && type === ActionSheetTypes.UPDATE)){
            refs.current[selectedRowNdx].close();
            setActionSheetType(ActionSheetTypes.ADD);
        }
    }, [isOpen]);

    useEffect(() => {
        if(type === ActionSheetTypes.DELETE){
            refs.current[selectedRowNdx].close();
            setActionSheetType(ActionSheetTypes.ADD);
        }
    }, [type]);

    useEffect(() => {
        refs.current = refs.current.slice(0, mealsData.length);
    }, [mealsData]);

    const renderLeftActions = (progress, dragX) => {
        return (
            <Box w="80%" mx={10} justifyContent={'center'} maxW="80%" mb={3} rounded="lg" bgColor={'#ffcc33'}>
                <Box mx={3}>
                    <Edit width={20} height={20} fill={'#f0f0f0'}/>
                </Box>
            </Box>
        );
    };

    const renderRightActions = (progress, dragX) => {
        return (
            <Box w="80%" mx={10} justifyContent={'center'} alignItems={'flex-end'} maxW="80%" mb={3} rounded="lg" bgColor={'#ff3333'}>
                <Box mx={3}>
                    <Trash width={20} height={20} fill={'#f0f0f0'} />
                </Box>
            </Box>
        );
    };

    const onSwipeableOpen = async (direction, meal, ndx) => {
        setSelectedRowNdx(ndx);
        if(SwipeTypes.LEFT === direction){
            setWillUpdateMeal(meal);
            setActionSheetType(ActionSheetTypes.UPDATE);
            onOpen();
        } else {
            await removeMeal(meal.id);
            setActionSheetType(ActionSheetTypes.DELETE);
        }
    }

    return(
        <View style={{ flex: 2, alignItems: 'center', width: '100%', top: 3 + '%' }}>
            <ScrollView w={'100%'}>
                {mealsData.map((meal, ndx) => <Swipeable
                    ref={(ref) => refs.current[ndx] = ref}
                    friction={2}
                    leftThreshold={80}
                    rightThreshold={80}
                    onSwipeableOpen={dir => onSwipeableOpen(dir, meal, ndx)}
                    renderLeftActions={renderLeftActions}
                    renderRightActions={renderRightActions}>
                    <Center>
                        <MenuCard
                            beginningContent={meal.beginning}
                            mainContent={meal.main}
                            sideArr={meal.sides}
                            isLoaded={isLoaded}
                            isUsed={meal.isUsed}
                        />
                    </Center>
                </Swipeable>)}
            </ScrollView>
        </View>
    );
}

export default MealsCardBodyDiningScreen;
