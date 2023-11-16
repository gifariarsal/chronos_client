import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const History = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const { user } = useSelector((state) => state.AuthReducer);
  const userId = user.id;

  useEffect(() => {
      fetchAttendanceHistory();
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
      const response = await axios.get(
        `${URL_API}/employee/attendance-history/${userId}`
      );
      setAttendanceHistory(response.data.history);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Box>
      <Box w={"full"} bg="white" py={4} px={{ base: 4, md: 12 }}>
        <Heading size={"lg"} mb={8}>
          Attendance History
        </Heading>
        <Table variant="striped" colorScheme="blue">
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
                  <Td>Rp {entry.Deduction ? entry.Deduction : 0}</Td>
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
