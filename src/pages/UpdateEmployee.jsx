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
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import MainButton from "../components/buttons/MainButton";

const UpdateEmployee = () => {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const navigate = useNavigate();

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

  const update = async (values) => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/auth/register",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Data has been updated successfully");
    } catch (error) {
      alert("Link expired. Data already updated");
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      birthday: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      update(values);
      navigate("/");
    },
  });

  const [showNew, setShowNew] = React.useState(false);
  const handleClickNew = () => setShowNew(!showNew);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
    >
      <Box boxShadow={"lg"} rounded={"2xl"} w={"40vw"}>
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
                <FormErrorMessage>
                  {formik.errors.password}
                </FormErrorMessage>
              )}
            </FormControl>
            <MainButton content="Save Data" />
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateEmployee;
