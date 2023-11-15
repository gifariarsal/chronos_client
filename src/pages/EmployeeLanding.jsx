import { Box, Flex, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Attendance from '../components/employee/Attendance';
import Payroll from '../components/employee/Payroll';
import History from '../components/employee/History';
import {
  IoAlarmOutline,
  IoDocumentTextOutline,
  IoFileTrayFullOutline,
} from "react-icons/io5";
import MenuDashboard from '../components/employee/MenuDashboard';

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
          pos={"fixed"}
          zIndex={10}
          w={{ base: "100%", md: "280px" }}
          bg={"#0B162E"}
          color="white"
          minH={{ md: "100vh" }}
          mt={"60px"}
        >
          <Stack
            spacing="2"
            direction={{ base: "row", md: "column" }}
            w={"full"}
          >
            <MenuDashboard
              onClick={() => setActivePage("attendance")}
              icon={IoAlarmOutline}
              name="Attendance"
            />
            <MenuDashboard
              onClick={() => setActivePage("history")}
              icon={IoDocumentTextOutline}
              name="History"
            />
            <MenuDashboard
              onClick={() => setActivePage("payroll")}
              icon={IoFileTrayFullOutline}
              name="Payroll Report"
            />
          </Stack>
        </Box>
        <Box w={"full"} ml={{ md: "280px" }} mt={{ base: "116px", md: "60px" }}>
          {renderPage()}
        </Box>
      </Flex>
    </Box>
  );
}

export default withAuth(EmployeeLanding);