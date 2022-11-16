import {
  Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem,
  MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Center,
} from '@chakra-ui/react';
import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Link as RouteLink
} from "react-router-dom";

export default function Nav({  }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>El Oeste Manga</Box>
          <RouteLink to="/">
            <Button
              variant={'ghost'}
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
              ref={btnRef}
              onClick={onOpen}
            >
              Inicio
            </Button>
          </RouteLink>
          <RouteLink to="/favoritos">
            <Button
              variant={'ghost'}
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}  
              ref={btnRef}
              onClick={onOpen}
            >
              Favoritos
            </Button>
          </RouteLink>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p></p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem ref={btnRef} onClick={onOpen}>
                      <RouteLink to="/favoritos">
                      Favoritos
                      </RouteLink>
                  </MenuItem>
                  <MenuItem><a href='https://www.instagram.com/_ezqdavid/' target='_blank'>Contacto</a></MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}