import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    fullName: "",
    email: "",
    username: "",
    birthday: "",
    roleID: "",
    baseSalary: "",
    isLogin: "",
  },
  login: false,
};

export const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, fullname, email, username, birthday, roleID, baseSalary, isLogin } =
        action.payload;
      state.user = {
        id,
        fullname,
        email,
        username,
        birthday,
        roleID,
        baseSalary,
        isLogin,
      };
    },
    loginSuccess: (state, action) => {
      state.login = true;
      localStorage.setItem("token", action.payload);
    },
    logoutSuccess: (state) => {
      state.login = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logoutSuccess } = AuthReducer.actions;

export default AuthReducer.reducer;