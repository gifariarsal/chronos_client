import React from 'react'
import AddEmployee from './AddEmployee';
import { IoAddOutline } from 'react-icons/io5';
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import EmployeeList from './EmployeeList';

const EmployeeManagement = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onCreate = () => {
      onOpen();
    };
  return (
    <Box w={"full"} minH={"100vh"}>
      <Box
        h={"62px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"#A2AABA"}
        py={4}
        px={8}
      >
        <Box>
          <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight={"medium"}>
            Employee Management
          </Text>
        </Box>
        <Box>
          <Button
            onClick={onCreate}
            gap={2}
            size={"sm"}
            fontSize={"xs"}
            rounded={"lg"}
            bg={"#0B162E"}
            ml={4}
            color={"white"}
            _hover={{ bg: "#253559" }}
          >
            <IoAddOutline size={24} />
            Add Employee
          </Button>
        </Box>
      </Box>
      <Box w={"full"} overflowX={"auto"}>
        <EmployeeList />
      </Box>
      <AddEmployee isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};

export default EmployeeManagement