'use client'
import { SearchIcon } from '@/icons'
import { Link, Image, Text, Box, Card, CardBody, Heading, Stack, Grid, Input, InputGroup, InputLeftElement, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Modal, useDisclosure, forwardRef, FormLabel, HStack, Progress } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const characters = [
  {
    name: 'yellow girl',
    image: 'https://i.namu.wiki/i/XLYhkjegAADZ-Vx7vM_OqijCvD01K6cOdsbui4L8fAM2Wb-YlCxCJTfW5NsSQxD_Ynm3FksWt7ItZjkEy2lEg01vf_ikWVAFwNSGX-DGaS_sDp9GTZWRo_RVFQa5qDU-ZSzbaqZ0EuUWSMde994Hj_kdfORfrf3v2bCEQBVDqFk.webp',
    description: 'Hi I\'m yellow girl',
  },
  {
    name: 'red girl',
    image: 'https://i.namu.wiki/i/bGfaCwl_uA56kIIGrjOXGB9ReqjrTvhEU5a7Eh5OtjntdAgg0IoK1Bok1P7M7ps0Gc9eaoGma8bL_A6eXdnFhbnnWY4k94UGzDi3KE_qyhYiT5G8mrS65BKHO3sFCGQwqlkcocdgIZL3VR7ZYsUuag.webp',
    description: 'Hi I\'m yellow girl',
  },
  {
    name: 'green girl',
    image: 'https://www.writeups.org/wp-content/uploads/Buttercup-Powerpuff-Girls-Profile.jpg',
    description: 'Hi I\'m yellow girl',
  },
  {
    name: 'brown girl',
    image: 'https://static.wikia.nocookie.net/blossom/images/c/c7/2007-9-29-0.jpg/revision/latest/scale-to-width-down/218?cb=20191115204239',
    description: 'Hi I\'m yellow girl',
  }
]

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [character, setCharacter] = React.useState();

  const click = (character) => {
    setCharacter(character);
    onOpen();
  }

  return (
    <Box p={3} maxW="1000px">
      <Box>
        <FriendModal onClose={onClose} isOpen={isOpen} character={character} />
        <Heading mb={5}>Friends</Heading>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input type='tel' placeholder="Search friends to talk with!" paddingStart={10} />
        </InputGroup>
        <Grid templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={4} mt={5}>
          {characters.map((c, i) => (
            <FriendCard key={i} onClick={() => click(c)}  {...c} />
          ))}
        </Grid>
      </Box>
    </Box>

  )
}

const FriendCard = forwardRef(({ name, image, description, onClick }, ref) => (<Box color='blue.400' _hover={{ color: 'blue.500' }}>
  <Card maxW='sm' _hover={{ border: '1px solid', borderColor: 'blue.500' }} onClick={onClick}>
    <CardBody p={3}>
      <Image
        src={image}
        width={200}
        height={200}
        objectFit="contain"
        alt='Green double couch with wooden legs'
        borderRadius='lg'
      />

      <Stack mt='3' spacing='3'>
        <Heading size='md'>{name}</Heading>
        <Text>
          {description}
        </Text>
      </Stack>
    </CardBody>

  </Card></Box>))

const FriendModal = ({ isOpen, onClose, character }) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/chat', { scroll: false })
    //onClose();
  }

  return (<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Friend Info</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <HStack>
          <Image
            src={character?.image}
            width={200}
            height={200}
            objectFit="contain"
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          <Stack flex={1}>
            <Text fontWeight={600} fontSize="lg">{character?.name}</Text>
            <Stack>
              <FormLabel>Type</FormLabel>
              <Text>Friendly</Text>
            </Stack>
            <Stack>
              <FormLabel>Count</FormLabel>
              <Text>3</Text>
            </Stack>
            <Stack>
              <FormLabel>Closity</FormLabel>
              <Progress hasStripe value={64} />
            </Stack>
          </Stack>
        </HStack>
      </ModalBody>

      <ModalFooter justifyContent="center">
        <Button colorScheme='blue' mr={3} onClick={onClick}>
          Chat Now!
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>)
}