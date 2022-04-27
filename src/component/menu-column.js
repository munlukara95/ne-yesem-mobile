import {Heading, Popover, Pressable, Skeleton, Text, VStack} from "native-base";
import React from "react";
import CryptoUtil from "../util/crypto-util";

const MenuColumn = ({headerColor, contentColor, headerText, contentText, isLoaded}) => {
    return(
        <VStack w={'30%'}>
            <Skeleton.Text lines={0} px={12} isLoaded={isLoaded}>
                <Heading color={headerColor} size={"xs"}>{headerText}</Heading>
            </Skeleton.Text>
            <Skeleton.Text lines={2} px={"auto"} isLoaded={isLoaded}>
                <Popover trigger={triggerProps => {
                    return <Pressable {...triggerProps}>
                        <Text isTruncated maxW="100%" w="80%" color={contentColor} fontSize={"xs"}>{contentText}</Text>
                    </Pressable>;
                }}>
                    <Popover.Content>
                        <Popover.Arrow/>
                        <Popover.Body>
                            {contentText}
                        </Popover.Body>
                    </Popover.Content>
                </Popover>
            </Skeleton.Text>
        </VStack>
    );
};

export default MenuColumn;
