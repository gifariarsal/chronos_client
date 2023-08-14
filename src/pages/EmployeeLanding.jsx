import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Attendance from '../components/employee/Attendance';
import Payroll from '../components/employee/Payroll';
import History from '../components/employee/History';

function withAuth(Component) {
  return function WrappedComponent(props) {
    const isAuthenticated = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

const EmployeeLanding = () => {
  const [activePage, setActivePage] = useState("attendance");
  const renderPage = () => {
    switch (activePage) {
      case "attendance":
        return <Attendance />;
      case "history":
        return <History />;
      case "payroll":
        return <Payroll />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Navbar />
      <Flex flexDir={{ base: "column", md: "row" }}>
        <Box
          w={{ base: "100%", md: "26%" }}
          bg={"#0B162E"}
          color="white"
          minH={{ base:"fit-content", lg:"100vh"}}
          mt={"60px"}
        >
          <VStack spacing="2" align="stretch">
            <Box w={"full"} bg={"#FCA311"} textAlign={"center"}>
              <Text
                fontSize={{ base: "2xl", md: "18" }}
                fontWeight="bold"
                p="4"
                color={"black"}
              >
                Employee Dashboard
              </Text>
            </Box>
            <Link as={"button"} onClick={() => setActivePage("attendance")}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                p={"4"}
                bg={"#0B162E"}
                _hover={{ bg: "#253559" }}
              >
                <Text
                  fontSize={{ base: "lg", md: "18" }}
                  fontWeight="bold"
                  ml={2}
                >
                  Attendance
                </Text>
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("history")}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                p={"4"}
                bg={"#0B162E"}
                _hover={{ bg: "#253559" }}
              >
                <Text
                  fontSize={{ base: "lg", md: "18" }}
                  fontWeight="bold"
                  ml={2}
                >
                  History
                </Text>
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("payroll")}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                p={"4"}
                bg={"#0B162E"}
                _hover={{ bg: "#253559" }}
              >
                <Text
                  fontSize={{ base: "lg", md: "18" }}
                  fontWeight="bold"
                  ml={2}
                >
                  Payroll Report
                </Text>
              </Box>
            </Link>
          </VStack>
        </Box>
        <Box w={"full"} mt={"60px"}>
          {renderPage()}
        </Box>
      </Flex>
    </Box>
  );
}

export default withAuth(EmployeeLanding);