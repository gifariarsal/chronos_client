import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  user: {
    id: null,
    fullName: "",
    email: "",
    username: "",
    birthday: "",
    roleID: "",
    baseSalary: "",
  },
  login: false,
};

export const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, fullName, email, username, birthday, roleID, baseSalary } =
        action.payload;
      state.user = {
        id,
        fullName,
        email,
        username,
        birthday,
        roleID,
        baseSalary,
      };
    },
    loginSuccess: (state) => {
      state.login = true;
    },
    logoutSuccess: (state) => {
      state.login = false;
      state.user.roleID = "";
    },
  },
});

export const login = (values, setLoading, toast, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const res = await axios.post(`${URL_API}/auth`, values);

      const token = res.data.token;
      localStorage.setItem("token", token);
      await dispatch(setUser(res.data.data));
      await dispatch(loginSuccess());
      if (res.data.data.roleID === 1) navigate("/admin");
      else navigate("/employee");
      toast({
        title: "Login Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
};

export const keepLogin = (toast) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${URL_API}/auth`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = (toast, navigate) => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch(logoutSuccess());
      toast({
        title: "Logout Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const { loginSuccess, logoutSuccess, setUser } = AuthReducer.actions;

export default AuthReducer.reducer;
