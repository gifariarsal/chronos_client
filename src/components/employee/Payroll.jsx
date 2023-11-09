import React, { useState } from "react";
import axios from "axios";
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
  Button,
  Select,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { TbReportOff } from "react-icons/tb";
const URL_API = process.env.REACT_APP_API_BASE_URL;

function SalaryByUserID() {
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filered, setFilered] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { user } = useSelector((state) => state.AuthReducer);
  const userID = user.id;

  const fetchSalaryRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${URL_API}/salary/${userID}`);
      setSalaryRecords(response.data.salaryRecords);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const calculateSalary = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${URL_API}/salary`, {
        userID,
      });
      fetchSalaryRecords();
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
          `${URL_API}/salary/${userID}?month=${selectedMonth}&year=${selectedYear}`
        );
        setSalaryRecords(response.data.salaryRecords);
        setFilered(true);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchFilteredSalaryRecords();
  };

  return (
    <Box>
      <Box w={"full"} bg="white" py={4} px={{ base: 4, md: 12 }}>
        <Heading size={"lg"} mb={8}>
          Payroll Reports
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
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          error && (
            <Box
              w={"full"}
              flexDir={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Icon mt={8} as={TbReportOff} boxSize={12} color={"gray.400"} />
              <Text mt={2} fontSize={"lg"} fontWeight={"medium"}>
                No data found
              </Text>
            </Box>
          )
        )}
        {salaryRecords && salaryRecords.length > 0 && (
          <Table variant="striped" colorScheme="blue">
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
        )}
        {filered && salaryRecords.length === 0 && (
          <Box
            w={"full"}
            flexDir={"column"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Icon mt={8} as={TbReportOff} boxSize={12} color={"gray.400"} />
            <Text mt={2} fontSize={"lg"} fontWeight={"medium"}>
              No data found
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SalaryByUserID;
