import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Topbar  from '../src/Components/Topbar'
import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import { AuthContext } from "./Context/Authcontext";
import { useContext } from "react";
import Login from "./Components/Login";
import Employees from "./Pages/Employee";
import Admins from "./Pages/Admins";
import Courses from "./Pages/Courses";
import Batches from "./Pages/Batches";
import Fees from "./Pages/Fees";

const drawerWidth = 260;

function App() {
  const [students, setStudents] = useState([]);
   const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Login />; 
  }
  return (
    <Box sx={{ display: "flex", width: "100vw" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
      <Topbar />
      <Box
        component="main"
        sx={{
           flexGrow: 1,
            width: "100%",
            p: 3,
            boxSizing: "border-box",
        }}
      >
        <Toolbar /> 
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard students={students} />} />
            <Route
              path="/students"
              element={<Students students={students} setStudents={setStudents} />}
            />
            <Route path="/employee" element={<Employees />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/fees" element={<Fees />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
