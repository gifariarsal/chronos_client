import { Route, Routes } from "react-router-dom";
import KeepLogin from "./middleware/KeepLogin";
import { useSelector } from "react-redux";
import { AdminLanding, EmployeeLanding, Login, UpdateEmployee } from "./pages";

function App() {
  const role = useSelector((state) => state.AuthReducer.user.roleID);

  const defaultRoutes = () => {
    if (role === "") {
      return (
        <>
          <Route path="/" element={<Login />} />
        </>
      );
    }
    return <Route path="/*" element={<h1>Not Found</h1>} />;
  };

  const adminRoutes = () => {
    if (role === 1) {
      return (
        <>
          <Route path="/admin" element={<AdminLanding />} />
          <Route path="/register/:token" element={<UpdateEmployee />} />
        </>
      );
    }
    return <Route path="/*" element={<h1>Not Found</h1>} />;
  };

  const employeeRoutes = () => {
    if (role === 2 || role === 3) {
      return (
        <>
          <Route path="/employee" element={<EmployeeLanding />} />
        </>
      );
    }
    return <Route path="/*" element={<h1>Not Found</h1>} />;
  };

  return (
    <>
      <KeepLogin>
        <Routes>
          {defaultRoutes()}
          {adminRoutes()}
          {employeeRoutes()}
        </Routes>
      </KeepLogin>
    </>
  );
}

export default App;
