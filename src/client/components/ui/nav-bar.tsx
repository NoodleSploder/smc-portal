// src/components/Navbar.tsx
import { Box, Flex, HStack, Link, IconButton, useColorModeValue, Text } from "@chakra-ui/react";
import { LuMenu } from 'react-icons/lu';
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="pink.300" _dark={{ bg: "gray.900" }} px={4} py={2} boxShadow="lg">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Text fontWeight="bold" fontSize="lg">
          So Many Chickens
        </Text>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/" fontWeight="medium">
            Home
          </Link>
          <Link as={RouterLink} to="/mainframes" fontWeight="medium">
            Mainframes
          </Link>
          <Link as={RouterLink} to="/peoplesoft" fontWeight="medium">
            PeopleSoft
          </Link>
          <Link as={RouterLink} to="/terminal" fontWeight="medium">
            Terminal
          </Link>
          <Link as={RouterLink} to="/about" fontWeight="medium">
            About
          </Link>
        </HStack>
        <IconButton
          size="md"
          icon={<LuMenu />}
          aria-label="Open Menu"
          display={{ md: "none" }}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
