import { Tabs } from '@chakra-ui/react';
import TerminalBox from './TerminalBox';
import { useState } from 'react';
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

const sessionTabs = ['one', 'two', 'three'];

export default function TerminalTabs() {
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
	  One
	</Tabs.Trigger>
	<Tabs.Trigger value="two">
	  <LuUser />
	  Two
	</Tabs.Trigger>
	<Tabs.Trigger value="three">
	  <LuUser />
	  Three
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
