import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

const Attendance = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [isClockInDisabled, setIsClockInDisabled] = useState(false);
  const [clockInStatus, setClockInStatus] = useState(false); // New state for clock-in status

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      fetchAttendanceHistory();
    }
  }, [userId]);

  useEffect(() => {
    // Check if clocked in
    const userIsClockedIn = attendanceHistory.some((entry) => !entry.ClockOut);
    setClockedIn(userIsClockedIn);

    // Check if clocked out
    const userIsClockedOut = attendanceHistory.some((entry) => entry.ClockOut);
    setClockedOut(userIsClockedOut);

    // Disable Clock In button if clocked in
    setIsClockInDisabled(userIsClockedIn);
  }, [attendanceHistory]);

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

  const handleClockIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/employee/clock-in",
        {
          userID: userId,
        }
      );

      if (response.status === 200) {
        setClockInTime(new Date());
        setClockInStatus(true); // Update the clock-in status
        alert("Clock In Successful");
        fetchAttendanceHistory();
      }
    } catch (error) {
      alert("Already clocked in");
      console.error("Error:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/employee/clock-out",
        {
          userID: userId,
        }
      );

      if (response.status === 200) {
        setClockOutTime(new Date());
        alert("Clock Out Successful");
        fetchAttendanceHistory();
      }
    } catch (error) {
      alert("Clock in first");
    }
  };
  return (
    <Box>
      <Box w={"full"} bg="white" py={4} px={8}>
        <VStack align="stretch">
          <Heading size={"lg"} mb={10}>
            Employee Attendance
          </Heading>
          <Heading size={"md"} mb={10}>
            Current Time: {currentTime.toLocaleTimeString()}
          </Heading>
          <Flex w={"full"} justifyContent={"space-between"}>
            <Button
              onClick={handleClockIn}
              disabled={isClockInDisabled}
              rounded={"lg"}
              w={{ base: 200, md: 250, lg: 350 }}
              bg={"#0B162E"}
              color={"white"}
              _hover={{ bg: "#253559" }}
            >
              Clock In
            </Button>
            <Button
              onClick={handleClockOut}
              disabled={!isClockInDisabled}
              rounded={"lg"}
              w={{ base: 200, md: 250, lg: 350 }}
              bg={"white"}
              border={"1px"}
              borderColor={"#0B162E"}
              color={"#0B162E"}
              _hover={{ bg: "gray.100" }}
            >
              Clock Out
            </Button>
          </Flex>
          {clockInStatus && clockInTime && (
            <VStack mt={4} spacing={2}>
              <Text color="green.500" fontWeight="bold">
                Clock In Status: Successful
              </Text>
              <Text>Clock In Time: {clockInTime.toLocaleString()}</Text>
            </VStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default Attendance;