import { Tabs } from '@chakra-ui/react';
import TerminalBox from '../../components/ui/TerminalBox';
import { useState } from 'react';
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

const sessionTabs = ['one', 'two', 'three'];

export default function ZOSTabs() {
  const [activeTab, setActiveTab] = useState<string>(sessionTabs[0]);
  const isActive = (tab: string) => tab === activeTab;

  return (
    <Tabs.Root
      lazyMount 
      unmountOnExit 
      defaultValue="one"
      onValueChange={(val) => {
        console.log(`Tab selected: ${val}`);
        setActiveTab(val);
      }}
    >

      <Tabs.List>
	<Tabs.Trigger value="one">
	  <LuUser />
	  Hercules Emulator Console
	</Tabs.Trigger>
	<Tabs.Trigger value="two">
	  <LuUser />
	  z/OS Server Console
	</Tabs.Trigger>
	<Tabs.Trigger value="three">
	  <LuUser />
	  z/OS Operator Console
	</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="one" style={{ height: 'calc(100vh - 80px)', position: 'relative' }}>
        <TerminalBox sessionName="one" active={isActive("one")} />
      </Tabs.Content>
      <Tabs.Content value="two" style={{ height: 'calc(100vh - 80px)', position: 'relative' }}>
        <TerminalBox sessionName="two" active={isActive("two")} />
      </Tabs.Content>
      <Tabs.Content value="three" style={{ height: 'calc(100vh - 80px)', position: 'relative' }}>
        <TerminalBox sessionName="three" active={isActive("three")} />
      </Tabs.Content>

    </Tabs.Root>
  );
}
