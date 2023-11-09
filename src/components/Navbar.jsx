import { Box, Button, Flex, Image, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../assets/logo_chronos.png";
import { logout } from "../redux/reducer/AuthReducer";

const Navbar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Warning",
      text: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });
    if (result.isConfirmed) {
      dispatch(logout(toast, navigate));
    }
  };

  return (
    <header>
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
    </header>
  );
};

export default Navbar;
