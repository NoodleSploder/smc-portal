import { Heading, Flex, Text } from '@chakra-ui/react';
//import { useDispatch, useSelector } from 'react-redux';
//import { increment } from '../components/data/player';
//import { RootState } from '../components/data/store';

const Home = () => {
  //const { encryptionKey, score } = useSelector((state: RootState) => state.player);
  //const dispatch = useDispatch();

  return (
    <Flex
      gap={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      maxW="100vw"
    >
      <Heading as="h3">Welcome to SoManyChickens!</Heading>
      <Flex
        direction="column"
        alignItems="left"
        justifyContent="left"
      >
        <Heading as="h2">Frontend</Heading>

        <Text>Build Tool: Vite</Text>
        <Text>Static Typing: TypeScript</Text>
        <Text>UI Framework: React</Text>
        <Text>State Management: Redux Toolkit</Text>
        <Text>React Error Boundary</Text>

        <Heading as="h2">Backend</Heading>

        <Text>Server Runtime: Node.js</Text>
        <Text>Web Framework: Express</Text>
        <Text>Template Engine: EJS</Text>
        <Text>Authentication Library: Passport.js</Text>
        <Text>Security and Storage</Text>
        <Text>Local Storage</Text>
        <Text>Crypto Library: Crypto JS</Text>
        <Text>Linting and Formatting</Text>
        <Text>Linter: ESLint·</Text>

      </Flex>

    </Flex>
  );
};

export default Home;
