import { Box, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const MenuDashboard = (props) => {
  return (
    <Box w={"100%"}>
      <Link as={"button"} onClick={props.onClick}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={{ base: "center", md: "flex-start" }}
          p={"4"}
          bg={"#0B162E"}
          _hover={{ bg: "#253559" }}
        >
          <Icon as={props.icon} w={6} h={6} />
          <Text
            display={{ base: "none", md: "block" }}
            fontSize={{ base: "lg", md: "18" }}
            fontWeight="bold"
            ml={2}
          >
            {props.name}
          </Text>
        </Box>
      </Link>
    </Box>
  );
};

export default MenuDashboard;
