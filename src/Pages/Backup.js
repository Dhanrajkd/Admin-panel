import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Users from "./Pages/Users";
import { Box,Toolbar } from "@mui/material";
import Dashboard from "./Pages/Dashboard";
<Box display="flex" minHeight="100vh">
  <Sidebar />

  <Box flexGrow={1} bgcolor="#f4f6f8">
    <Topbar />

    <Box p={3}>
      <Routes>
         <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/users" element={<Users />} />
      </Routes>
    </Box>
  </Box>
</Box> 

function App() {
  const drawerWidth = 240;
  return (
     <BrowserRouter>
      <Box display="flex" minHeight="100vh">
          <Sidebar />
          <Box
            flexGrow={1}
            bgcolor="#f4f6f8"
            sx={{ ml: `${drawerWidth}px` }}
          >
            <Topbar />
            <Toolbar />
            <Box p={3}>
              <Routes>
                <Route path="/users" element={<Users />} />
                 <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Box>
          </Box>
      </Box>
    </BrowserRouter> 
  );
}

export default App;
 <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          border:"1px solid black",
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
          <Route path="/employee" element={<Employees/>} />
          <Route path="/admins" element={<Admins/>}/>
          <Route path="/cources" element={<Courses/>}/>
          <Route path="/batches" element={<Batches/>} />
          <Route path="/fees" element={<Fees/>} />
        </Routes>
      </Box>