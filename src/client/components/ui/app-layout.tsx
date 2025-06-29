import '../../../styles.css';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  VStack,
  //Link,
  Collapsible,
} from '@chakra-ui/react';
import { LuMenu, LuChevronRight } from 'react-icons/lu';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Flex direction="column" h="100vh">
      {/* Header */}
      <Flex
        as="header"
        bg="teal.500"
        color="white"
        p={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          aria-label="Toggle Menu"
          variant="outline"
          onClick={toggleSidebar}
        >
          <LuMenu />
        </IconButton>
        <Text fontSize="xl" fontWeight="bold">
          SOMANYCHICKENS.com
        </Text>
      </Flex>


      {/* Body */}
      <Flex
        flex="1"
        direction="column"
        minH="100vh"
      >
        <Flex flex="1">
          {/* Sidebar */}
          <Box
            bg="gray.200"
            w={isSidebarOpen ? '250px' : '0'}
            overflow="hidden"
            transition="width 0.3s ease"
          >
            <VStack align="start" p={isSidebarOpen ? 4 : 0}>
              <Link to="/">Home</Link>
              <Link to="/peoplesoft">PeopleSoft</Link>

              {/* Collapsible Mainframes */}
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="collapsible-trigger">
                  <Text>Mainframes</Text>
                  <Box as={LuChevronRight} className="chevron" />
                </Collapsible.Trigger>

                <Collapsible.Content>
                  <VStack align="start" pl={4} py={2}>
                    <Link to="/mainframes/zos31">IBM z/OS 3.1</Link>
                    <Link  to="/mainframes/aix">IBM AIX</Link>
                    <Link to="/mainframes/hercules">Hercules</Link>
                  </VStack>
                </Collapsible.Content>
              </Collapsible.Root>

              {/* Collapsible DevOps */}
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="collapsible-trigger">
                  <Text>DevOps</Text>
                  <Box as={LuChevronRight} className="chevron" />
                </Collapsible.Trigger>

                <Collapsible.Content>
                  <VStack align="start" pl={4} py={2}>
                    <Link  to="/devops/cockpit">Cockpit</Link>
                    <Link  to="/devops/lxd">LXD</Link>
                    <Link  to="/devops/docker">Docker</Link>
                    {/* External link: plain <a> */}
                    <a href="https://rancher.somanychickens.com" target="_blank" rel="noopener noreferrer">
                      Kubernetes
                    </a>

                    <Link  to="/devops/terminal">Terminal</Link>
                  </VStack>
                </Collapsible.Content>
              </Collapsible.Root>

              <Link  to="/about">About</Link>
            </VStack>
          </Box>

          {/* Main content */}
          <Box flex="1" p={8} overflowY="auto">
            <Outlet />
          </Box>
        </Flex>

        {/* ✅ Footer */}
        <Box as="footer" bg="gray.200" py={4} px={8}>
          <Text fontSize="sm" textAlign="center">
            © {new Date().getFullYear()} SOMANYCHICKENS.com — All rights reserved.
          </Text>
        </Box>

      </Flex>
    </Flex>
  );
};

export default Layout;
