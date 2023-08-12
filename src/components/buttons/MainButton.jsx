import { Button } from "@chakra-ui/react";
import React from "react";

const MainButton = (props) => {
  return (
    <Button
      type="submit"
      display={"flex"}
      justifyContent={"center"}
      w={"100%"}
      mt={"6"}
      rounded={"lg"}
      color={"white"}
      bgColor={"#14213D"}
      _hover={{ bgColor: "#253559" }}
      _active={{ bgColor: "#0B162E" }}
    >
      {props.content}
    </Button>
  );
};

export default MainButton;