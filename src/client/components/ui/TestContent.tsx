import React, { useEffect, useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

type TestContentProps = {
  sessionName: string;
  active: boolean;
};

const TestContent: React.FC<TestContentProps> = ({ sessionName, active }) => {


  return (
    <Flex height="600px" width="100%">
      <Box width="100%" height="100%" >
	stuff
      </Box>
    </Flex>
  );
};

export default TestContent;
