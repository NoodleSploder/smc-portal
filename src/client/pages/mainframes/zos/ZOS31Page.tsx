import {Flex, Heading } from '@chakra-ui/react';
import ZOS31Tabs from './ZOS31Tabs'

const ZOS31page = () => {
    return (
      <Flex direction="column"  height="1360px">
        <Heading as="h1" mb={4} p={4}>
          IBM z/OS 3.1 Consoles
        </Heading>
        <Flex flex="1" overflow="hidden">

            <ZOS31Tabs />

        </Flex>
      </Flex>
    );
};

export default ZOS31page;
