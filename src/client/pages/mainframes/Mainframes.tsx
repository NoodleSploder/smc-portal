import { For, SimpleGrid, Tabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import { Box, Heading} from '@chakra-ui/react';

import ZOS31page from './zos/ZOS31Page';

const Mainframes = () => {
  return (
    <Box p={8}  bg="black" height="100%">
      <Heading color="chartreuse">Mainframes [Hercules]</Heading>
      <br/>
      <SimpleGrid columns={2} gap="14" width="full">
        <For each={["line"]}>
          {(variant) => (
            <Tabs.Root
	      key={variant}
              defaultValue="ibm-zos-31"
              variant={variant}
              colorPalette="green"
            >
              <Tabs.List css={{ "--color": "colors.red.500" }}>
                <Tabs.Trigger
		  value="ibm-zos-31"
                  style={{ color: "teal" }}
                  _hover={{ color: "red.700" }}
                  _active={{ color: "aqua" }}
                  _focus={{ bg: "aqua" }}
                  _disabled={{ opacity: "0.5" }}
                >
                  <LuUser />
                  IBM z/OS 3.1
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="ibm-aix"
                  style={{ color: "teal" }}
                  _hover={{ color: "red.700" }}
                  _active={{ color: "aqua" }}
                  _focus={{ bg: "aqua" }}
                  _disabled={{ opacity: "0.5" }}
                >
                  <LuFolder />
                  IBM AIX v11
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="settings"
                  style={{ color: "teal" }}
                  _hover={{ color: "red.700" }}
                  _active={{ color: "aqua" }}
                  _focus={{ bg: "aqua" }}
                  _disabled={{ opacity: "0.5" }}
                >
                  <LuSquareCheck />
                  Settings
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content
                value="ibm-zos-31"
                style={{ }}
                _active={{ bg: "aqua" }}
              >
		<ZOS31page />
              </Tabs.Content>
              <Tabs.Content value="ibm-aix">
		IBM AIX
              </Tabs.Content>
              <Tabs.Content value="settings">
                Manage your settings here
              </Tabs.Content>
            </Tabs.Root>
          )}
        </For>
      </SimpleGrid>
    </Box>
  );
};

export default Mainframes;
