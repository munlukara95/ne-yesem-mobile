import React, {useEffect, useState} from 'react';
import {Actionsheet, Button, HStack, Input, KeyboardAvoidingView, Pressable, ScrollView, VStack} from "native-base";
import ActionSheetHeaderDiningScreen from "./actionsheet-header.dining-screen";
import Minus from "../../public/icon/minus.svg";
import DiningTypes from "../type/dining-types";
import {addMeal, updateMeal} from '../service/local-storage.service';
import ActionSheetTypes from "../type/actionsheet-types";
import useMealContentValid from "../hook/use-meal-content-valid";
import {Platform} from "react-native";


const ActionSheetDiningScreen = ({isOpen, onClose, type, meal}) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isMain, setIsMain] = useState(true);
    const [isSide, setIsSide] = useState(true);
    const [counterSide, setCounterSide] = useState(0);
    const [sideArr, setSideArr] = useState([]);
    const [beginningValue, setBeginningValue] = useState('');
    const [mainValue, setMainValue] = useState('');
    const isValidContent = useMealContentValid(beginningValue, mainValue, sideArr);

    useEffect(() => {
        if(type === ActionSheetTypes.UPDATE) {
            const maxSideId = getMaxSidesId(sideArr);
            if ( counterSide > 0 && counterSide > maxSideId) {
                setSideArr([...sideArr, {id: counterSide, value: ''}]);
            }
        } else {
            if(counterSide > 0){
                setSideArr([...sideArr, {id: counterSide, value: ''}]);
            }
        }
    }, [counterSide]);

    useEffect(() => {
        if(isOpen && type === ActionSheetTypes.UPDATE){
            setWillUpdateDataToState();
        }

        return () => {
            if(!isOpen)
                clearAllParams();
        }
    }, [isOpen]);

    const setWillUpdateDataToState = () => {
        let maxSideId = 0;
        setBeginningValue(meal.beginning);
        setMainValue(meal.main);
        if(meal.sides !== null) {
            setSideArr(meal.sides);
            maxSideId = getMaxSidesId(meal.sides);
        }
        if(meal.beginning !== null)
            setIsBeginning(false);
        if(meal.main !== null)
            setIsMain(false);

        setCounterSide(maxSideId);
    };

    const getMaxSidesId = (sides) => {
        const sidesId = sides.reduce((acc, val)=>[...acc, val.id], []);
        return Math.max(...sidesId);
    }

    const clearAllParams = () => {
        setBeginningValue('');
        setMainValue('');
        setSideArr([]);
        setIsBeginning(true);
        setIsMain(true);
        setIsSide(true);
        setCounterSide(0);
    };

    const removeSideInput = (id) => {
        const newSideArr = sideArr.filter((side) => side.id !== id );
        setSideArr(newSideArr);
    };

    const onChangeTextInput = (value, type, id?) => {
        switch (type){
            case DiningTypes.BEGINNING:
                setBeginningValue(value);
                break;
            case DiningTypes.MAIN:
                setMainValue(value);
                break;
            case DiningTypes.SIDE:
                const newSideArr = sideArr.map(side => side.id === id ? {...side, value: value} : side);
                setSideArr(newSideArr);
                break;
        }
    };

    const handleSaveMeal = async (e) => {
        e.preventDefault();
        const willSaveMeal = prepareWillSendMealData();
        await addMeal(willSaveMeal);
        onClose();
    };

    const handleUpdateMeal = async (e) => {
        e.preventDefault();
        const preparedMealData = prepareWillSendMealData();
        const willUpdateMeal = {...meal, ...preparedMealData};
        await updateMeal(meal.id, willUpdateMeal);
        onClose();
    };

    const prepareWillSendMealData = () => {
        let willSendBeginning = beginningValue.trim();
        if(isBeginning || beginningValue === '')
            willSendBeginning = null;

        let willSendMain = mainValue.trim();
        if(isMain || mainValue === '')
            willSendMain = null;

        let filteredSides = sideArr.filter(side => side.value !== '').map(side => {
            return {id: side.id, value: side.value.trim()};
        });

        let willSendSides = filteredSides;
        if(filteredSides.length === 0)
            willSendSides = null;

        return {beginning: willSendBeginning, main: willSendMain, sides: willSendSides};
    };

    return(
        <Actionsheet isOpen={isOpen} onClose={() => onClose()} size={'full'}>
            <Actionsheet.Content>
                <ScrollView w={"100%"}>
                    <KeyboardAvoidingView h={{
                        base: "400px",
                        lg: "auto"
                    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <ActionSheetHeaderDiningScreen headerText={"Başlangıç"} isAdd={isBeginning} setIsAdd={setIsBeginning} />
                        {!isBeginning
                            ? <VStack px={2} m={2} w={"100%"} justifyContent={"center"} alignItems={"flex-start"}>
                                <Input onChangeText={(newText) => onChangeTextInput(newText, DiningTypes.BEGINNING)} value={beginningValue} w={"95%"} variant="outline" />
                            </VStack>
                            : null
                        }
                        <ActionSheetHeaderDiningScreen headerText={"Ana Ürün"} isAdd={isMain} setIsAdd={setIsMain} />
                        {!isMain
                            ? <VStack px={2} m={2} w={"100%"} justifyContent={"center"} alignItems={"flex-start"}>
                                <Input onChangeText={(newText) => onChangeTextInput(newText, DiningTypes.MAIN)} value={mainValue} w={"95%"} variant="outline" />
                            </VStack>
                            : null
                        }
                        <ActionSheetHeaderDiningScreen isSide={true} headerText={"Yan Ürün"} isAdd={isSide}
                                                       setIsAdd={setIsSide} counter={counterSide} setCounter={setCounterSide}/>
                        {
                            sideArr.map((side, ndx) => {
                            return(
                                <HStack key={ndx+'hstack'} w="100%" h={60} px={4} justifyContent="space-between" alignItems="center">
                                    <VStack key={ndx+'vstack-first'} w={"85%"}>
                                        <Input onChangeText={(newText) => onChangeTextInput(newText, DiningTypes.SIDE, side.id)} key={ndx+'input'} value={side.value} variant="outline" />
                                    </VStack>
                                    <VStack key={ndx+'vstack-second'}>
                                        <Pressable key={ndx+'pressable'} onPress={() => {
                                            removeSideInput(side.id);
                                        }}>
                                            <Minus height={"100%"} width={"20"} fill={"#a1a1aa"}/>
                                        </Pressable>
                                    </VStack>
                                </HStack>
                            )
                        })}
                        <VStack mt={3} mb={3} w={"100%"} justifyContent={"center"} alignItems={"flex-end"}>
                            <Button isDisabled={!isValidContent} onPress={type === ActionSheetTypes.ADD ? handleSaveMeal : handleUpdateMeal} w={"100"} size="sm" variant="outline" colorScheme={type === ActionSheetTypes.ADD ? 'danger' : 'warning'}>
                                {type === ActionSheetTypes.ADD
                                    ? 'Kaydet'
                                    : 'Güncelle'
                                }
                            </Button>
                        </VStack>
                    </KeyboardAvoidingView>
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default ActionSheetDiningScreen;
