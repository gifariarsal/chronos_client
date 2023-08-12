import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLanding from "./pages/AdminLanding";
import EmployeeLanding from "./pages/EmployeeLanding";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/landing/admin" element={<AdminLanding />}></Route>
        <Route path="/landing/employee" element={<EmployeeLanding />}></Route>
      </Routes>
    </div>
  );
}

export default App;
