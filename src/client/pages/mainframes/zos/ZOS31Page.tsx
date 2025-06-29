import { Box, Heading } from '@chakra-ui/react';
import ZOS31Tabs from './ZOS31Tabs'

const ZOS31page = () => {
    return (
      <Box p={4}
        bgColor="cyan.300"
      >
        <Heading size="md" mb={4}>IBM z/OS 3.1 Consoles</Heading>
        <ZOS31Tabs />
      </Box>
    );
};

export default ZOS31page;
