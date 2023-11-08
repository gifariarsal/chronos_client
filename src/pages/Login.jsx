import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import MainButton from "../components/buttons/MainButton";
import { login } from "../redux/reducer/AuthReducer";
import Logo from "../assets/logo_chronos.png";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => setShow(!show);

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
      dispatch(login(values, setLoading, toast, navigate));
    },
  });

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
      bg={"#F1FAFF"}
    >
      <Box
        bg={"white"}
        boxShadow={"lg"}
        rounded={"2xl"}
        w={{ base: "80vw", md: "60vw", lg: "40vw" }}
      >
        <Box
          mt={8}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={4}
        >
          <Image w={{ base: "150px", md: "200px"}} src={Logo} alt="logo" />
          <Text fontSize={{ base: "2xl", md: "3xl"}} color={"brand.main"} fontWeight={"bold"}>
            Log In
          </Text>
        </Box>
        <Box w={"full"} spacing={"4"} p={8}>
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
            <MainButton content="Sign In" loading={loading} />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
