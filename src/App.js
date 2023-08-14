import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLanding from "./pages/AdminLanding";
import EmployeeLanding from "./pages/EmployeeLanding";
import UpdateEmployee from "./pages/UpdateEmployee";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/landing/admin" element={<AdminLanding />}></Route>
        <Route path="/landing/employee/:userID" element={<EmployeeLanding />}></Route>
        <Route path="/register/:token" element={<UpdateEmployee />}></Route>
      </Routes>
    </div>
  );
}

export default App;
