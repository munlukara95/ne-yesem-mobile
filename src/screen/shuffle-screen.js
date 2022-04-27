import React, {useCallback, useState, Fragment} from 'react';
import {ImageBackground, Platform, SafeAreaView, StyleSheet} from "react-native";
import {Box, Button, Heading, Modal, Pressable, Skeleton, Text, VStack} from "native-base";
import {RectButton} from "react-native-gesture-handler";
import Shuffle from '../../public/icon/shuffle.svg';
import FocusAwareStatusBar from "../component/focus-aware-status-bar";
import {getRandomShuffledMeal, updateMeal} from "../service/local-storage.service";
import useSideContentFormat from "../hook/use-side-content-format";
import {useFocusEffect} from "@react-navigation/native";

const ShuffleScreen = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [shuffledMeal, setShuffledMeal] = useState({id: 1, beginning: '', main: '', sides: []});
    const [open, setOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);
    const sideContent = useSideContentFormat(shuffledMeal?.sides);

    useFocusEffect(
        useCallback(() => {
            let timeout = setTimeout(() => {
                setIsLoaded(true);
                clearTimeout(timeout);
            }, 2000);
        }, [])
    )

    const handleShuffle = async () => {
        const meal = await getRandomShuffledMeal();
        if(typeof meal === 'undefined'){
            openWarningModal();
        } else {
            setShuffledMeal(meal);
            openModal();
        }
    };

    const pickedMeal = async () => {
        const picked = {...shuffledMeal, isUsed: true};
        await updateMeal(picked.id, picked);
        setOpen(false);
    }

    const openModal = () => {
        setOpen(true);
    };

    const openWarningModal = () => {
        setWarningOpen(true);
    };

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'tomato'}} />
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <FocusAwareStatusBar backgroundColor={'#ff6347'} barStyle={'light-content'} />
                <Skeleton position={'absolute'} zIndex={2} h={'65%'} isLoaded={isLoaded}>
                    <ImageBackground source={require('../../public/img/tomatoes.jpg')} resizeMode={'cover'} style={{
                        flex: 1,
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }} />
                </Skeleton>
                <Box position={'absolute'} zIndex={3} w="130%" bottom={0} maxW="150%" alignItems={'center'} justifyContent={'center'}
                     h={'50%'} maxH={'100%'} shadow={2} overflow="hidden" borderColor="coolGray.200" borderWidth="1" bgColor={'#ffffff'}
                     borderTopRadius={250}>
                    <Skeleton.Text w={80} lines={1} isLoaded={isLoaded}>
                        <Heading size={"sm"}>Bugün size ne önerebilirim?</Heading>
                    </Skeleton.Text>
                    <Pressable onPress={handleShuffle}>
                    <Box w={70} h={70} alignItems={'center'} justifyContent={'center'} mt={6} shadow={2}>
                        <Skeleton borderRadius={'full'} isLoaded={isLoaded} h={70} w={70}>
                            <RectButton style={[styles.button]}>
                                <Shuffle width={20} height={20} fill={'#fff'} />
                            </RectButton>
                        </Skeleton>
                    </Box>
                    </Pressable>
                </Box>
                <Modal isOpen={open} onClose={() => setOpen(false)} mt={12}>
                    <Modal.Content maxWidth="350">
                        <Modal.CloseButton />
                        <Modal.Header>Rastgele Yemek</Modal.Header>
                        <Modal.Body>
                            <VStack space={2} m={3}>
                                <Heading color={"#595959"} size={"xs"}>Başlangıç</Heading>
                                <Text color={"#8c8c8c"} fontSize={"xs"}>{shuffledMeal.beginning}</Text>
                                <Heading color={"#595959"} size={"xs"}>Ana Ürün</Heading>
                                <Text color={"#8c8c8c"} fontSize={"xs"}>{shuffledMeal.main}</Text>
                                <Heading color={"#595959"} size={"xs"}>Yan Ürün</Heading>
                                <Text color={"#8c8c8c"} fontSize={"xs"}>{sideContent}</Text>
                            </VStack>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setOpen(false);
                                }}>
                                    Vazgeç
                                </Button>
                                <Button colorScheme="teal" onPress={pickedMeal}>
                                    Seç
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Modal isOpen={warningOpen} onClose={() => setWarningOpen(false)} mt={12}>
                    <Modal.Content maxWidth="350">
                        <Modal.CloseButton />
                        <Modal.Header>Uyarı</Modal.Header>
                        <Modal.Body>
                            <VStack space={2} m={3}>
                                <Heading color={"#595959"} size={"xs"}>Menü'de yemek yoktur!</Heading>
                            </VStack>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button colorScheme="teal" onPress={() => {
                                    setWarningOpen(false);
                                }}>
                                    Tamam
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </SafeAreaView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        flex: 1,
        backgroundColor: '#ff6347',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Platform.OS === 'ios' ? 35 : 50,
    }
});

export default ShuffleScreen;
