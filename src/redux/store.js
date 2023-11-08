import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import EmployeeReducer from "./reducer/EmployeeReducer";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    EmployeeReducer: EmployeeReducer,
  },
});
