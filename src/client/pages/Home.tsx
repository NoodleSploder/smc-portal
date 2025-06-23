import { Heading, Button, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../components/data/player';
import { RootState } from '../components/data/store';

const Home = () => {
  const { encryptionKey, score } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  return (
    <Flex
      gap={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      maxW="100vw"
    >
      <Heading as="h1">Welcome to 2025 Boilerplate! ({score})</Heading>
      <Button
        variant="solid"
        size="sm"
        mt={4}
        onClick={() => dispatch(increment())}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Home;
