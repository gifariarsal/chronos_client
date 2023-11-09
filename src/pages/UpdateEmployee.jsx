import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import MainButton from "../components/buttons/MainButton";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../redux/reducer/EmployeeReducer";

const UpdateEmployee = () => {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const handleClickNew = () => setShowNew(!showNew);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Username is required"),
    birthday: Yup.string().required("Birthday is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        "Password must be at least 8 characters, 1 symbol, and 1 uppercase"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      birthday: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await dispatch(updateEmployee(values, token, toast, navigate));
      setLoading(false);
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
        boxShadow={"lg"}
        rounded={"2xl"}
        w={{ base: "80vw", md: "60vw", lg: "40vw" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <VStack px={10} py={10} w={"full"}>
            <Text fontSize={"xl"} fontWeight={700}>
              Complete Employee Data
            </Text>
            <FormControl
              isRequired
              isInvalid={formik.touched.fullname && formik.errors.fullname}
            >
              <FormLabel htmlFor="fullname">Full Name</FormLabel>
              <Input
                id="fullname"
                type="text"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <FormErrorMessage>{formik.errors.fullname}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.birthday && formik.errors.birthday}
            >
              <FormLabel mt={4} htmlFor="birthday">
                Birthday
              </FormLabel>
              <Input
                id="birthday"
                type="date"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthday}
              />
              {formik.touched.birthday && formik.errors.birthday && (
                <FormErrorMessage>{formik.errors.birthday}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.username && formik.errors.username}
            >
              <FormLabel mt={4} htmlFor="username">
                Username
              </FormLabel>
              <Input
                id="username"
                type="text"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              mb={4}
              w={"100%"}
              isRequired
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel mt={4}>Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  rounded={"lg"}
                  type={showNew ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <InputRightElement width="3.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickNew}>
                    {showNew ? (
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
            <MainButton content="Save Data" loading={loading} />
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateEmployee;
