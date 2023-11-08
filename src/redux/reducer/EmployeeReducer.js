import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  employee: [],
};

export const EmployeeReducer = createSlice({
  name: "EmployeeReducer",
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.employee = [...action.payload];
    },
  },
});

export const addEmployee = (values, setLoading, toast, onClose, resetForm) => {
  return async () => {
    try {
      setLoading(true);
      await axios.post(`${URL_API}/employee`, values);
      toast({
        title: "Success",
        description: "Employee created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      onClose();
      resetForm();
    } catch (error) {
      toast({
        title: "Failed to create employee",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const updateEmployee = (values, token, toast, navigate) => {
  return async () => {
    try {
      await axios.patch(`${URL_API}/employee`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "Employee updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (error) {
      toast({
        title: "Failed to update employee",
        description: "Link expired. Data already updated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
}

export const getEmployee = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${URL_API}/employee`);
      dispatch(setEmployee(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setEmployee } = EmployeeReducer.actions;

export default EmployeeReducer.reducer;
