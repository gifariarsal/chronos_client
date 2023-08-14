import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Select,
} from "@chakra-ui/react";

function SalaryByUserID() {
  const { userID } = useParams();
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const fetchSalaryRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/employee/salary/${userID}`
      );
      setSalaryRecords(response.data.salaryRecords);
      setIsDataFetched(true);
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
      fetchSalaryRecords();
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleFilter = () => {
    const fetchFilteredSalaryRecords = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/employee/salary/${userID}?month=${selectedMonth}&year=${selectedYear}`
        );
        setSalaryRecords(response.data.salaryRecords);
        setIsDataFetched(true);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchFilteredSalaryRecords();
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
        <Flex justifyContent="center" mb={4}>
          <Select
            placeholder="Select Month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            mr={2}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Select>

          <Select
            placeholder="Select Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            mr={2}
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </Select>

          <Button
            onClick={handleFilter}
            bg={"#0B162E"}
            fontSize={"xs"}
            color={"white"}
            _hover={{ bg: "#253559" }}
          >
            Apply
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
