import { Link, Image, Text, Box, Card, CardBody, Heading, Stack, Grid, Input, InputGroup, InputLeftElement, HStack, Button, FormLabel, useRadioGroup, useRadio, useToast } from '@chakra-ui/react'

export default function Page() {
  return (
    <Stack p={3} w="100%" maxW="1000px" alignItems="center">
     <SnsItem name="Google"/>
     <SnsItem name="Apple"/>
    </Stack>

  )
}

const SnsItem = ({ name }) => (
  <Button colorScheme="blue">{name} Login</Button>)