import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import ZOSTabs from './ZOSTabs';

export default function ZOS31page() {
  return (
    <Box p={4}
      bgColor="cyan.300" 
    >
      <Heading size="md" mb={4}>IBM z/OS 3.1 Consoles</Heading>
      <ZOSTabs />
    </Box>
  );
}
