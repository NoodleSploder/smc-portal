import { Tabs, Flex } from '@chakra-ui/react';
import TerminalBox from '../../../components/ui/TerminalBox';
import { useState } from 'react';
import { LuUser } from "react-icons/lu"

const sessionTabs = ['one', 'two', 'three'];

const ZOS31Tabs = () => {
  //const [activeTab, setActiveTab] = useState<string>(sessionTabs[0]);
  const [activeTab] = useState<string>(sessionTabs[0]);
  const isActive = (tab: string) => tab === activeTab;

  return (
    <Tabs.Root
      lazyMount
      unmountOnExit
      defaultValue="zos31one"
      onValueChange={(val) => {
        console.log(`Tab selected: ${val}`);
        //setActiveTab(val);
      }}
    >

      <Tabs.List>
        <Tabs.Trigger value="zos31one">
          <LuUser />
          Hercules Emulator Console
        </Tabs.Trigger>
        <Tabs.Trigger value="zos31two">
          <LuUser />
          z/OS Server Console
        </Tabs.Trigger>
        <Tabs.Trigger value="zos31three">
          <LuUser />
          z/OS Operator Console
      	</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="zos31one" style={{ height: 'calc(100vh - 180px)', position: 'relative' }}>
        <Flex>
          <TerminalBox sessionName="zos31one" active={isActive("zos31one")} />
        </Flex>
      </Tabs.Content>

      <Tabs.Content value="zos31two" style={{ height: 'calc(100vh - 180px)', position: 'relative' }}>
        <Flex>
          <TerminalBox sessionName="zos31two" active={isActive("zos31two")} />
        </Flex>
      </Tabs.Content>
      <Tabs.Content value="zos31three" style={{ height: 'calc(100vh - 180px)', position: 'relative' }}>
        <Flex>
          <TerminalBox sessionName="zos31three" active={isActive("zos31three")} />
        </Flex>
      </Tabs.Content>

    </Tabs.Root>
  );
}

export default ZOS31Tabs;

