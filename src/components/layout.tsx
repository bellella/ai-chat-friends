'use client'
import { BellIcon } from '@/icons';
import { Box, Heading, Text, Link as ChakraLink, VStack, 
    HStack, Flex, Link, Drawer, DrawerBody, DrawerContent, 
    DrawerHeader, DrawerOverlay, IconButton, useDisclosure, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function GlobalLayout({ children }) {
    const drawer = useDisclosure();
    return (
        <Box>
            <Draw drawer={drawer} />
            <Header drawer={drawer}/>
            <VStack spacing={4}>
                {children}
            </VStack>
            <Box mt={8}>
                <Footer />
            </Box>
        </Box>
    );

}

const Draw = ({ drawer }) => {
    const { isOpen, onOpen, onClose } = drawer;
    return (<Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
                <Stack mt={3} gap={6}>
                <DrawerMenuItem name="my page"/>
                <DrawerMenuItem name="payment"/>
                <DrawerMenuItem name="about service"/>
                <DrawerMenuItem name="sign out"/>
                </Stack>
            </DrawerBody>
        </DrawerContent>
    </Drawer>)
}

const DrawerMenuItem = ({name}) => (
<Link as={NextLink} href="/sign/form" color="gray.600" fontWeight={600}>{name}</Link>
)

const Header = ({ drawer }) => {
    const { isOpen, onOpen, onClose } = drawer;
    return (
        <Flex justify="space-between" align="center" p={3} mb={8}>
            <Heading>
                <Link as={NextLink} href="/#">AiChatFriends👩‍🦰</Link>
            </Heading>
            <HStack spacing={4}>
                <Link href='/friends'>
                    Friends
                </Link>
                <Link href='/chat'>
                    chat
                </Link>
                <Box>
                    <IconButton
                        onClick={onOpen}
                        colorScheme='teal'
                        aria-label='Call Segun'
                        size='lg'
                        icon={<BellIcon />}
                    />
                </Box>
                {/* Add more links as needed */}
            </HStack>
        </Flex >)
}

const Footer = () => {
    return (
        <Flex p={4} bg="gray.200" alignItems="center" justifyContent="center" minHeight={200}>
            <Text>&copy; 2024 푸터입니다.</Text>
        </Flex>
    );
};
