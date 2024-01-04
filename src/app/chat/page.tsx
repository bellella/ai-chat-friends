import { Link } from '@chakra-ui/next-js'
import { Text, Avatar, Box, Button, Heading, Input, VStack, HStack, Stack } from '@chakra-ui/react'

const messages = [
  {
    sender: 'user',
    text: 'lococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococ'
  },
  {
    sender: 'friend',
    text: 'siba'
  },
  {
    sender: 'friend',
    text: 'hello~~'
  },
  {
    sender: 'user',
    text: 'I wanna sing a song'
  },
  {
    sender: 'friend',
    text: 'lococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococ'
  },
  {
    sender: 'user',
    text: 'lococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococ'
  },
]

const image = 'https://i.namu.wiki/i/bGfaCwl_uA56kIIGrjOXGB9ReqjrTvhEU5a7Eh5OtjntdAgg0IoK1Bok1P7M7ps0Gc9eaoGma8bL_A6eXdnFhbnnWY4k94UGzDi3KE_qyhYiT5G8mrS65BKHO3sFCGQwqlkcocdgIZL3VR7ZYsUuag.webp';

export default function Page() {

  return (
    <Box w="full" px={3} maxW="1000px">
      <Heading>Chat</Heading>
      <HStack width="full" justifyContent="center">
      <Box p={4} borderWidth="1px" borderRadius="md" width="500px" height="70vh">
        <VStack w="100%" h="100%" spacing={4}>
          <VStack
          w="100%"
            gap={3} flex="1" overflowY="auto">
            {messages.map((message, index) => (
              <HStack
                key={index}
                alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              >
                {message.sender === 'friend' && <Avatar name='Kola Tioluwani' src={image}/>}
                <Box p={2}
                  borderRadius="md"
                  bg={message.sender === 'user' ? 'blue.100' : 'gray.100'}>
                  <Text maxW="30vh">{message.text}</Text>
                </Box>
              </HStack>
            ))}
          </VStack>
          <Input
            placeholder="Message Friend..."
          />
        </VStack>
      </Box>
      </HStack>
    </Box>
  )
}