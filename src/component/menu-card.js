import React from 'react';
import {Box, Divider, HStack} from "native-base";
import MenuColumn from "./menu-column";
import useSideContentFormat from "../hook/use-side-content-format";

const MenuCard = ({beginningContent, mainContent, sideArr, isLoaded, isUsed}) => {
    const isExistBeginningContent = beginningContent !== null && typeof (beginningContent) !== 'undefined';
    const isExistMainContent = mainContent !== null && typeof (mainContent) !== 'undefined';
    const isExistSideContent = sideArr !== null && typeof (sideArr) !== 'undefined';
    const sideContent = useSideContentFormat(sideArr);

    return (
        <Box w="80%" maxW="100%" mb={3} rounded="lg" shadow={2} overflow="hidden" borderColor="coolGray.200" borderWidth="1" bgColor={isUsed ? '#0d9488' : '#fff'}>
            <HStack space={2} m={3}>
                {isExistBeginningContent
                    ? <MenuColumn headerColor={isUsed ? styles.header.light : styles.header.dark} contentColor={isUsed ? styles.text.light : styles.text.dark} headerText={"Başlangıç"}
                                  contentText={beginningContent} isLoaded={isLoaded}/>
                    : null
                }
                {isExistBeginningContent && isExistMainContent
                    ? <Divider orientation={"vertical"} my="1" />
                    : null
                }
                {isExistMainContent
                    ? <MenuColumn headerColor={isUsed ? styles.header.light : styles.header.dark} contentColor={isUsed ? styles.text.light : styles.text.dark} headerText={"Ana Ürün"}
                                    contentText={mainContent} isLoaded={isLoaded}/>
                    : null
                }
                {(isExistMainContent && isExistSideContent) || (isExistBeginningContent && isExistSideContent)
                    ? <Divider orientation={"vertical"} my="1" />
                    : null
                }
                {isExistSideContent
                    ? <MenuColumn headerColor={isUsed ? styles.header.light : styles.header.dark} contentColor={isUsed ? styles.text.light : styles.text.dark} headerText={"Yan Ürün"}
                                  contentText={sideContent} isLoaded={isLoaded}/>
                    : null
                }
            </HStack>
        </Box>
    );
}

const styles = {
    header: {
        dark: "#595959",
        light: '#f0f0f0'
    },
    text: {
        dark: "#8c8c8c",
        light: '#fff'
    }
};

export default MenuCard;
