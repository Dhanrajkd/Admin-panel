import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Group"
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { NavLink } from "react-router-dom";
import logo from '../Logo/logo-png.png'
import { Height } from "@mui/icons-material";
import {Box} from "@mui/material";
const drawerWidth = 260;
const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff", 
        },
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{
          width:260,
          height:100,
          objectFit: "contain"
        }}
      >
      </Box>
      <List sx={{ padding: "10px" }}>
        <ListItemButton
          component={NavLink}
          sx={{
            borderRadius: "8px",
            marginBottom: "8px",
            "&.active": {
              backgroundColor: "#1976d2",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/students"
          sx={{
            borderRadius: "8px",
            "&.active": {
              backgroundColor: "#1976d2",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to="/employee"
          sx={{
            borderRadius:"8px",
            "&.active":{
              backgroundColor:"#1976d2",
              color:"#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Emplyees" />
        </ListItemButton>
        <ListItemButton 
          component={NavLink}
          to="/admins"
          sx={{
            borderRadius:"8px",
            "&.active":{
              backgroundColor:"#1976d2",
              color:"#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            }
            }}
        >
          <ListItemIcon>
            <PeopleIcon/>
          </ListItemIcon>
          <ListItemText primary="Admins"/>
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to="/courses"
          sx={{
             borderRadius:"8px",
            "&.active":{
              backgroundColor:"#1976d2",
              color:"#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            }
          }}
        >
          <ListItemIcon>
            <PeopleIcon/>
          </ListItemIcon>
          <ListItemText primary="Cources" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to="/batches"
          sx={{
              borderRadius:"8px",
            "&.active":{
              backgroundColor:"#1976d2",
              color:"#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            }
          }}
        >
          <ListItemIcon>
             <PeopleIcon/>
          </ListItemIcon>
          <ListItemText primary="Batches"/>
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to="/fees"
          sx={{
              borderRadius:"8px",
            "&.active":{
              backgroundColor:"#1976d2",
              color:"#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            }
          }}
        >
          <ListItemIcon>
            <CurrencyRupeeIcon />
          </ListItemIcon>
          <ListItemText primary="Fees"/>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
