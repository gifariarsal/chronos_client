import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { keepLogin } from "../redux/reducer/AuthReducer";

const KeepLogin = ({ children }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    dispatch(keepLogin(toast));
  }, []);

  return <>{children}</>;
};

export default KeepLogin;
