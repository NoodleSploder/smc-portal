import { Tabs } from '@chakra-ui/react';
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
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: "100%",
      }}
      minH="1360px"
    >

      <Tabs.List
        style={{ flex: '0 0 auto' }}
      >
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

      <Tabs.Content
        value="zos31one"
        minH="1360px"
        style={{
          //height: 'calc(100vh)',
          height: "100vh",
          //height: "100%",
          position: 'relative',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: "100%",
        }}
      >
        <TerminalBox
          sessionName="zos31one"
          active={isActive("zos31one")}
        />
      </Tabs.Content>

      <Tabs.Content
        value="zos31two"
        style={{
          //height: 'calc(100vh)',
          //position: 'relative',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: "100%",
          width: "100%",
        }}
      >
        <TerminalBox
          sessionName="zos31two"
          active={isActive("zos31two")} />
      </Tabs.Content>

      <Tabs.Content
        value="zos31three"
        style={{
          //height: 'calc(100vh)',
          //position: 'relative',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: "100%",
          width: "100%",
        }}
      >
        <TerminalBox
          sessionName="zos31three"
          active={isActive("zos31three")}
        />
      </Tabs.Content>

    </Tabs.Root>
  );
}

export default ZOS31Tabs;

