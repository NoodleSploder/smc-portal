//import { colorPalettes } from "compositions/lib/color-palettes"
import { Stack, Card, Avatar, Button, For, SimpleGrid, Tabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import { Box, Heading, Text } from '@chakra-ui/react';


const PeopleSoft = () => {
  return (
    <Box p={8} bg="cyan.300" height="100%">
      <Heading>PeopleSoft Environments<br/></Heading>
      <br/>
      <Stack gap="4" direction="row" wrap="wrap">
        <Card.Root width="320px" variant="elevated">
          <Card.Body gap="2" bg="purple.300">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="IHUB 9.2" />
            </Avatar.Root>
            <Card.Title mb="2">PeopleSoft<br/>Interaction Hub <br/>9.1</Card.Title>
            <Card.Description>
	      PeopleSoft <br/>Interaction Hub 9.1
            </Card.Description>
            <Button
              style={{ color: "chartreuse" }}
              asChild
            >
              <a target="_blank" rel="noopener noreferrer" href="https://ihub.somanychickens.com" >Launch</a>
            </Button>
          </Card.Body>
          <Card.Footer justifyContent="flex-end"  bg="purple.700">
            <Button variant="ghost"
              style={{ marginTop: "11px", marginBottom: "-12px", color: "chartreuse" }}
              asChild
            >
              <a href="#">Admin</a>
            </Button>
          </Card.Footer>
        </Card.Root>

        <Card.Root width="320px" variant="elevated">
          <Card.Body gap="2" bg="purple.300">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="CS 9.2" />
            </Avatar.Root>
            <Card.Title mb="2">PeopleSoft<br/>Campus Solutions <br/>9.2</Card.Title>
            <Card.Description>
              PeopleSoft <br/> Campus Solutions 9.2
            </Card.Description>
            <Button
              style={{ color: "chartreuse" }}
              asChild
            >
              <a target="_blank" rel="noopener noreferrer" href="https://cs.somanychickens.com" >Launch</a>
            </Button>
          </Card.Body>
          <Card.Footer justifyContent="flex-end"  bg="purple.700">
            <Button variant="ghost"
              style={{ marginTop: "11px", marginBottom: "-12px", color: "chartreuse" }}
            >Admin</Button>
          </Card.Footer>
        </Card.Root>

        <Card.Root width="320px" variant="elevated">
          <Card.Body gap="2" bg="purple.300">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="HCM 9.2" />
            </Avatar.Root>
            <Card.Title mb="2">PeopleSoft<br/>Human Capital Management <br/>9.2</Card.Title>
            <Card.Description>
              PeopleSoft <br/> Human Capital Management 9.2
            </Card.Description>
            <Button
              style={{ color: "chartreuse" }}
            >Launch</Button>

          </Card.Body>
          <Card.Footer justifyContent="flex-end"  bg="purple.700">
            <Button variant="ghost"
              style={{ marginTop: "11px", marginBottom: "-12px", color: "chartreuse" }}
            >Admin</Button>
          </Card.Footer>
        </Card.Root>

        <Card.Root width="320px" variant="elevated">
          <Card.Body gap="2" bg="purple.300">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="FIN 9.2" />
            </Avatar.Root>
            <Card.Title mb="2">PeopleSoft<br/>Financial / Supply Chain Mgmt <br/>9.2</Card.Title>
            <Card.Description>
              PeopleSoft <br/> Financials / Supply Chain Management 9.2
            </Card.Description>
            <Button
              style={{ color: "chartreuse" }}
            >Launch</Button>

          </Card.Body>
          <Card.Footer justifyContent="flex-end"  bg="purple.700">
            <Button variant="ghost"
              style={{ marginTop: "11px", marginBottom: "-12px", color: "chartreuse" }}
            >Admin</Button>
          </Card.Footer>
        </Card.Root>


        <Card.Root width="320px" variant="elevated">
          <Card.Body gap="2" bg="purple.300">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="CRM 9.2" />
            </Avatar.Root>
            <Card.Title mb="2">PeopleSoft<br/>Customer Relationship Mgmt <br/>9.2</Card.Title>
            <Card.Description>
              PeopleSoft <br/> Customer Relationship Management 9.2
            </Card.Description>
            <Button
              style={{ color: "chartreuse" }}
              asChild>
              <a href="#">Launch</a>
            </Button>
          </Card.Body>
          <Card.Footer justifyContent="flex-end"  bg="purple.700">
            <Button variant="ghost"
              style={{ marginTop: "11px", marginBottom: "-12px", color: "chartreuse" }}
              asChild>
              <a href="#">Admin</a>
            </Button>
          </Card.Footer>
        </Card.Root>
      </Stack>
    </Box>
  );
};

export default PeopleSoft;
