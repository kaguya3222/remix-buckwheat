import { Flex, Text } from '@chakra-ui/react'

export const Header = () => {
  return (
    <header>
      <Flex
        background="blue.300"
        color="white"
        height="20"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="3xl">Remix buckwheat</Text>
      </Flex>
    </header>
  )
}
