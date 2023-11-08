import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../redux/reducer/EmployeeReducer";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.EmployeeReducer);

  useEffect(() => {
    dispatch(getEmployee());
  }, []);

  const getRoleName = (roleID) => {
    switch (roleID) {
      case 1:
        return "Admin";
      case 2:
        return "Morning";
      case 3:
        return "Night";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box flex="1">
      <Table variant="striped" colorScheme="orange" fontSize={"sm"}>
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Email</Th>
            <Th>Username</Th>
            <Th>Shift</Th>
            <Th>Birthday</Th>
            <Th>Day Salary</Th>
            <Th>Join Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employee.map((user) => (
            <Tr key={user.id}>
              <Td>{user.fullName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.username}</Td>
              <Td>{getRoleName(user.roleID)}</Td>
              <Td>{formatDate(user.birthday)}</Td>
              <Td>{user.daySalary}</Td>
              <Td>{formatDate(user.createdAt)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EmployeeList;
