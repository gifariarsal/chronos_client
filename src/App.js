import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLanding from "./pages/AdminLanding";
import EmployeeLanding from "./pages/EmployeeLanding";
import UpdateEmployee from "./pages/UpdateEmployee";
import KeepLogin from "./middleware/KeepLogin";

function App() {
  return (
    <div className="App">
      <KeepLogin>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<AdminLanding />}></Route>
          <Route path="/employee" element={<EmployeeLanding />}></Route>
          <Route path="/register/:token" element={<UpdateEmployee />}></Route>
        </Routes>
      </KeepLogin>
    </div>
  );
}

export default App;
