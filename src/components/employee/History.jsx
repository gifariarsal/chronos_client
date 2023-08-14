import axios from "axios";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const History = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      fetchAttendanceHistory();
    }
  }, [userId]);

  const fetchAttendanceHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/employee/attendance-history/${userId}`
      );
      setAttendanceHistory(response.data.history);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Box>
      <Box w={"full"} bg="white" py={4} px={8}>
        <Heading size={"lg"} mb={8}>
          Attendance History
        </Heading>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Clock In</Th>
              <Th>Clock Out</Th>
              <Th>Day Salary</Th>
              <Th>Deduction</Th>
              <Th>Month</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendanceHistory
              .slice()
              .sort((a, b) => new Date(b.ClockIn) - new Date(a.ClockIn))
              .map((entry) => (
                <Tr key={entry.id}>
                  <Td>{new Date(entry.ClockIn).toLocaleString()}</Td>
                  <Td>
                    {entry.ClockOut
                      ? new Date(entry.ClockOut).toLocaleString()
                      : "Not Clocked Out"}
                  </Td>
                  <Td>Rp {entry.DaySalary}</Td>
                  <Td>Rp {entry.Deduction}</Td>
                  <Td>{entry.Month}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default History;
