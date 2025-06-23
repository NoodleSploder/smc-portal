import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import TerminalTabs from '../components/ui/TerminalTabs';

export default function TerminalPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>Embedded Terminal</Heading>
      <TerminalTabs />
    </Box>
  );
}
