import { Tabs } from '@chakra-ui/react';
import Terminal from './Terminal';

const sessionTabs = ['one', 'two', 'three'];

export default function TerminalTabs() {
  return (
    <Tabs.Root defaultValue={sessionTabs[0]} variant="enclosed">
      <Tabs.List>
        {sessionTabs.map(name => (
          <Tabs.Trigger key={name} value={name}>
            {name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {sessionTabs.map(name => (
        <Tabs.Content key={name} value={name}>
          <Terminal sessionName={name} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
