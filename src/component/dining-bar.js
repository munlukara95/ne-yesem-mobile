import React from 'react';
import {Box, HStack, Pressable, Text, VStack} from "native-base";
import Plus from "../../public/icon/plus.svg";
import {RectButton} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";

const DiningBar = ({onOpen}) => {
    return(
        <HStack shadow={5} bg="#fff" px="1" py="3"
                justifyContent="space-between" alignItems="center" w="100%" maxW="100%" h="60" maxH={"70"}>
            <VStack alignItems="center">
                <Text ml={2} color="tomato" fontSize="20" fontWeight="bold">
                    Sevdiğin Menüler
                </Text>
            </VStack>
            <VStack w={'20%'} >
                <Pressable alignItems={'center'} w={'100%'} onPress={() => onOpen()}>
                    <Box w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'center'}>
                        <RectButton style={[styles.button]}>
                            <Plus height={"100%"} width={"20"} fill={"#ff6347"}/>
                        </RectButton>
                    </Box>
                </Pressable>
            </VStack>
        </HStack>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default DiningBar;
