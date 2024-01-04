'use client'
import { SearchIcon } from '@/icons'
import { Link, Image, Text, Box, Card, CardBody, Heading, Stack, Grid, Input, InputGroup, InputLeftElement, HStack, Button, FormLabel, useRadioGroup, useRadio, useToast } from '@chakra-ui/react'

export default function Page() {
  const toast = useToast()
  return (
    <Stack p={3} w="100%" maxW="1000px" alignItems="center">
      <Heading>Profile</Heading>
      <Stack maxW="500px" w="100%">
        <FormItem name="Name" />
        <GenderItem />
        <Date />
      </Stack>
      <Button mt={10} onClick={() => {
        // Create an example promise that resolves in 5s
        const examplePromise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(200), 5000)
        })

        // Will display the loading toast until the promise is either resolved
        // or rejected.
        toast.promise(examplePromise, {
          success: { title: 'Promise resolved', description: 'Looks great' },
          error: { title: 'Promise rejected', description: 'Something wrong' },
          loading: { title: 'Promise pending', description: 'Please wait' },
        })
      }}>Update</Button>
    </Stack>

  )
}

const FormItem = ({ name }) => (
  <Stack>
    <FormLabel>{name}</FormLabel>
    <Input
      placeholder={name}
      size='sm'
    /></Stack>)

const Date = () => (
  <Stack><FormLabel>Birthday</FormLabel><Input
    placeholder="Select Date and Time"
    size="md"
    type="datetime-local"
  /></Stack>
)

const GenderItem = () => {
  const options2 = ['Female', 'Male', 'Others']
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })

  return (<Stack>
    <FormLabel>Gender</FormLabel>
    <HStack>
      {options2.map((value, i) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value + i} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  </Stack>);
}

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}
