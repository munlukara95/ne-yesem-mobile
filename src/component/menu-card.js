import React from 'react';
import {Box, Divider, HStack} from "native-base";
import MenuColumn from "./menu-column";
import useSideContentFormat from "../hook/use-side-content-format";
import useMenuCardColumnSize from "../hook/use-menu-card-column-size";
import useNullCheck from "../hook/use-null-check";

const MenuCard = ({beginningContent, mainContent, sideArr, isLoaded, isUsed}) => {
    const isExistBeginningContent = useNullCheck(beginningContent);
    const isExistMainContent = useNullCheck(mainContent)
    const isExistSideContent = useNullCheck(sideArr);
    const sideContent = useSideContentFormat(sideArr);
    const columnSizes = useMenuCardColumnSize(isExistBeginningContent, isExistMainContent, isExistSideContent);

    return (
        <Box w="80%" maxW="100%" mb={3} rounded="lg" shadow={2} overflow="hidden" borderColor="coolGray.200" borderWidth="1" bgColor={isUsed ? '#0d9488' : '#fff'}>
            <HStack space={2} m={3}>
                {isExistBeginningContent
                    ? <MenuColumn headerColor={isUsed ? styles.header.light : styles.header.dark} contentColor={isUsed ? styles.text.light : styles.text.dark} headerText={"Başlangıç"}
                                  contentText={beginningContent} isLoaded={isLoaded} w={columnSizes.beginning}/>
                    : null
                }
                {isExistBeginningContent && isExistMainContent
                    ? <Divider orientation={"vertical"} my="1" />
                    : null
                }
                {isExistMainContent
                    ? <MenuColumn headerColor={isUsed ? styles.header.light : styles.header.dark} contentColor={isUsed ? styles.text.light : styles.text.dark} headerText={"Ana Ürün"}
                                    contentText={mainContent} isLoaded={isLoaded} w={columnSizes.main}/>
                    : null
                }
                {(isExistMainContent && isExistSideContent) || (isExistBeginningContent && isExistSideContent)
                    ? <Divider orientation={"vertical"} my="1" />
                    : null
                }
                {isExistSideContent
                    ? <MenuColumn headerColor={isUsed ? styles.header.light : styles.header.dark} contentColor={isUsed ? styles.text.light : styles.text.dark} headerText={"Yan Ürün"}
                                  contentText={sideContent} isLoaded={isLoaded} w={columnSizes.sides}/>
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
