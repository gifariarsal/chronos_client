import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const Attendance = () => {
  const toast = useToast();
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [isClockInDisabled, setIsClockInDisabled] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer);
  const userId = user.id;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  useEffect(() => {
    const userIsClockedIn = attendanceHistory.some((entry) => !entry.ClockOut);
    setClockedIn(userIsClockedIn);

    const userIsClockedOut = attendanceHistory.some((entry) => entry.ClockOut);
    setClockedOut(userIsClockedOut);

    setIsClockInDisabled(userIsClockedIn);
  }, [attendanceHistory]);

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

  const handleClockIn = async () => {
    try {
      const response = await axios.post(
        `${URL_API}/employee/clock-in`,
        {
          userID: userId,
        }
      );

      if (response.status === 200) {
        setClockInTime(new Date());
        toast({
          title: "Clock In Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchAttendanceHistory();
      }
    } catch (error) {
      toast({
        title: "Clock in failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.post(
        `${URL_API}/employee/clock-out`,
        {
          userID: userId,
        }
      );

      if (response.status === 200) {
        setClockOutTime(new Date());
        toast({
          title: "Clock Out Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchAttendanceHistory();
      }
    } catch (error) {
      toast({
        title: "Clock out failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box w={"full"} bg="white" py={4} px={{ base: 4, md: 12 }}>
      <Heading size={"lg"}>Employee Attendance</Heading>
      <Heading size={"md"} my={4}>
        Current Time: {currentTime.toLocaleTimeString([], { hour12: false })}
      </Heading>
      <Box
        w={"full"}
        bg={"white"}
        mb={10}
        textAlign={"start"}
        py={4}
        px={8}
        boxShadow={"md"}
        rounded={"lg"}
      >
        <Text fontWeight={"bold"} mb={2}>
          Employee Data:
        </Text>
        <Box
          display={"flex"}
          flexDir={{ base: "column", md: "row" }}
          gap={{ md: 24 }}
        >
          <Box>
            <Text>Name: {user.fullName}</Text>
            <Text>Email: {user.email}</Text>
          </Box>
          <Box>
            <Text>
              Shift:{" "}
              {user.roleID === 2
                ? "Morning"
                : user.roleID === 3
                ? "Night"
                : "Unknown Shift"}
            </Text>
            <Text>
              Work Schedule:{" "}
              {user.roleID === 2
                ? "8:00 - 16:00"
                : user.roleID === 3
                ? "16:00 - 24:00"
                : "Unknown Schedule"}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box w={"full"} mb={12}>
        <Flex w={"full"} justifyContent={"space-between"} mb={12}>
          <Button
            onClick={handleClockIn}
            disabled={isClockInDisabled}
            rounded={"lg"}
            w={{ base: 200, md: 250, lg: 350 }}
            bg={"#0B162E"}
            color={"white"}
            _hover={{ bg: "#253559" }}
          >
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Icon as={IoLogInOutline} w={5} h={5} />
              <Text>Clock In</Text>
            </Box>
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
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Icon as={IoLogOutOutline} w={5} h={5} />
              <Text>Clock Out</Text>
            </Box>
          </Button>
        </Flex>
        {clockInTime && (
          <VStack mt={4} spacing={2}>
            <Text color="green.500" fontWeight="bold">
              Clocked In Successful
            </Text>
            <Text>
              Clock In Time: {moment(clockInTime).format("DD/MM/YYYY HH:mm:ss")}
            </Text>
          </VStack>
        )}
        {clockOutTime && (
          <VStack mt={4} spacing={2}>
            <Text color="red.500" fontWeight="bold">
              Clocked Out Successful
            </Text>
            <Text>
              Clock Out Time:{" "}
              {moment(clockOutTime).format("DD/MM/YYYY HH:mm:ss")}
            </Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default Attendance;
