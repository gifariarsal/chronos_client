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
  Text,
} from "@chakra-ui/react";

const EmployeeList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth");
        const sortedUsers = response.data.users.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
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

  const filteredUsers = users.filter((user) => user.roleID !== 1);

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
          {filteredUsers.map((user) => (
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
