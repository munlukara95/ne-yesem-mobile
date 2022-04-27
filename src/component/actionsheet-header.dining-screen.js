import React from 'react';
import {HStack, Pressable, Text, VStack} from "native-base";
import Plus from "../../public/icon/plus.svg";
import Minus from "../../public/icon/minus.svg";

const ActionSheetHeaderDiningScreen = ({headerText, isAdd, setIsAdd, isSide, counter, setCounter}) => {
    return(
        <HStack w="100%" h={60} px={4} justifyContent="space-between" alignItems="center">
            <VStack>
                <Text fontSize="16" color="gray.500">
                    {headerText}
                </Text>
            </VStack>
            <VStack>
                <Pressable onPress={() => {
                    if(isSide)
                        setCounter(counter + 1);
                    else
                        setIsAdd(!isAdd);
                }}>
                    {isAdd
                        ? <Plus height={"100%"} width={"20"} fill={"#a1a1aa"}/>
                        : (isSide
                            ? null
                            : <Minus height={"100%"} width={"20"} fill={"#a1a1aa"}/>
                        )
                    }
                </Pressable>
            </VStack>
        </HStack>
    );
};

export default ActionSheetHeaderDiningScreen;
