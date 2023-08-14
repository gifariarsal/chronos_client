import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import MainButton from "../buttons/MainButton";
import { useFormik } from "formik";

const AddEmployee = ({ isOpen, onClose }) => {

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    roleID: Yup.string().required("Role is required"),
    baseSalary: Yup.string()
      .required("Base salary is required")
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Must contains only digits"
      ),
    daySalary: Yup.string()
      .required("Day salary is required")
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Must contains only digits"
      ),
  });

  const addEmployee = async (values) => {
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        email: values.email,
        roleID: values.roleID,
        baseSalary: values.baseSalary,
        daySalary: values.daySalary
      });
      alert("Employee created successfully");
    } catch (err) {
      alert("Failed to create employee");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      roleID: "",
      baseSalary: "",
      daySalary: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      addEmployee(values);
      onClose();
      resetForm();
    },
  });

  const calculateDaySalary = (baseSalary) => {
    if (baseSalary) {
      const numericBaseSalary = parseFloat(baseSalary.replace(/\$|,/g, ""));
      const calculatedDaySalary = (numericBaseSalary / 20).toFixed(0); // Menggunakan toFixed(0) untuk menghasilkan angka tanpa desimal
      return calculatedDaySalary;
    }
    return "";
  };

  // Fungsi untuk mengupdate daySalary saat baseSalary berubah
  const handleBaseSalaryChange = (e) => {
    const { value } = e.target;
    formik.handleChange(e); // Panggil handleChange formik untuk update input baseSalary
    const calculatedDaySalary = calculateDaySalary(value);
    formik.setFieldValue("daySalary", calculatedDaySalary);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={700}>
            Create New Employee
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl
              isRequired
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <FormLabel>Email Address</FormLabel>
              <Input
                id="email"
                name="email"
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
              isInvalid={formik.touched.roleID && formik.errors.roleID}
            >
              <FormLabel mt={4}>Role</FormLabel>
              <RadioGroup
                id="roleID"
                name="roleID"
                value={formik.values.roleID}
                onChange={(value) => formik.setFieldValue("roleID", value)}
              >
                <HStack spacing={8}>
                  <Radio value="2">Morning Employee</Radio>
                  <Radio value="3">Night Employee</Radio>
                </HStack>
              </RadioGroup>
              {formik.touched.roleID && formik.errors.roleID && (
                <FormErrorMessage>{formik.errors.roleID}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.baseSalary && formik.errors.baseSalary}
            >
              <FormLabel mt={4}>Monthly Salary</FormLabel>
              <Input
                id="baseSalary"
                name="baseSalary"
                type="text"
                rounded={"lg"}
                onChange={handleBaseSalaryChange}
                onBlur={formik.handleBlur}
                value={formik.values.baseSalary}
              />
              {formik.touched.baseSalary && formik.errors.baseSalary && (
                <FormErrorMessage>{formik.errors.baseSalary}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.daySalary && formik.errors.daySalary}
            >
              <FormLabel mt={4}>Day Salary</FormLabel>
              <Input
                id="daySalary"
                name="daySalary"
                type="text"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.daySalary}
              />
              {formik.touched.daySalary && formik.errors.daySalary && (
                <FormErrorMessage>{formik.errors.daySalary}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <MainButton content="Create Employee" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployee;
