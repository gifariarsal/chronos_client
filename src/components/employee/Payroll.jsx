import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  ListItem,
  Spinner,
  Alert,
  AlertIcon,
  Button,
} from "@chakra-ui/react";

function SalaryByUserID() {
  const { userID } = useParams(); // Get userID from the URL parameter
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // New state to track if data is fetched

  const fetchSalaryRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/employee/salary/${userID}`
      );
      setSalaryRecords(response.data.salaryRecords);
      setIsDataFetched(true); // Set data fetched to true
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const calculateSalary = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/employee/salary`,
        { userID }
      );
      fetchSalaryRecords(); // Refresh the records after calculation
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Box w={"full"} bg="white" py={4} px={8}>
        <Heading size={"lg"} mb={8}>
          Salary Reports
        </Heading>
        <Flex justifyContent="center" mb={4}>
          <Button
            onClick={calculateSalary}
            w={{ base: 200, md: 250, lg: 350 }}
            bg={"#0B162E"}
            color={"white"}
            _hover={{ bg: "#253559" }}
            mb={10}
          >
            Generate Payroll
          </Button>
        </Flex>
        {isLoading ? (
          <Flex justifyContent="center" alignItems="center" height="300px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Box>
            {error ? (
              <Alert status="error" mb={4}>
                <AlertIcon />
                Error: {error}
              </Alert>
            ) : (
              // Only show data if it's fetched
              isDataFetched && (
                <Table variant="striped" colorScheme="orange">
                  <Thead>
                    <Tr>
                      <Th>Total Salary</Th>
                      <Th>Total Deduction</Th>
                      <Th>Month</Th>
                      <Th>Year</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {salaryRecords.map((record) => (
                      <Tr key={record.id}>
                        <Td>{record.TotalSalary}</Td>
                        <Td>{record.TotalDeduction}</Td>
                        <Td>{record.Month}</Td>
                        <Td>{record.Year}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SalaryByUserID;