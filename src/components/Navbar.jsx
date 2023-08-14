import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../redux/reducer/AuthReducer";
import Logo from "../assets/logo_chronos.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token));
    navigate("/");
  };

  return (
    <header>
      <Box>
        <Flex
          pos={"fixed"}
          zIndex={100}
          w={"full"}
          bg={"white"}
          color={"#1c1c1c"}
          minH={"60px"}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={"#7F8BA5"}
          align={"center"}
          display={"flex"}
          justifyContent={"space-between"}
          px={"8"}
        >
          <Image
            src={Logo}
            h={"32px"}
            _hover={{ filter: "brightness(150%)", transition: "300ms" }}
          />
          <Button fontSize={"xs"} size={"sm"} onClick={() => handleLogout()}>
            Logout
          </Button>
        </Flex>
      </Box>
    </header>
  );
};

export default Navbar;
