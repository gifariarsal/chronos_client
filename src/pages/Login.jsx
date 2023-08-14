import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import ForgotPasswordModal from "../components/ForgotPasswordModal";
import MainButton from "../components/buttons/MainButton";
import { loginSuccess } from "../redux/reducer/AuthReducer";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [userId, setUserId] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onForgot = () => {
    onOpen();
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const login = async (values) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth", {
        email: values.email,
        password: values.password,
      });
      const userID = res.data.user.id;
      console.log(res);
      if (res.status === 200) {
        dispatch(loginSuccess(res.data.token));
        if (res.data.user.roleID === 1) {
          navigate("/landing/admin");
        } else if (res.data.user.roleID === 2 || res.data.user.roleID === 3) {
          navigate(`/landing/employee/${userID}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
    >
      <Box
        boxShadow={"lg"}
        rounded={"2xl"}
        w={{ base: "80vw", md: "60vw", lg: "40vw" }}
      >
        <VStack spacing={"4"} px={8} py={12}>
          <Box w={"full"}>
            <Text
              w={"100%"}
              fontSize={"xx-large"}
              display={"flex"}
              justifyContent={"flex-start"}
              fontWeight={"bold"}
            >
              Log In
            </Text>
          </Box>
          <Box w={"full"}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isRequired
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  rounded={"lg"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel htmlFor="password" mt={"4"}>
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    rounded={"lg"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <InputRightElement width="3.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? (
                        <IoEyeOffOutline size={"20px"} />
                      ) : (
                        <IoEyeOutline size={"20px"} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                )}
              </FormControl>
              <MainButton content="Sign In" />
            </form>
          </Box>
        </VStack>
      </Box>
      {/* <ForgotPasswordModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
    </Box>
  );
};

export default Login;
