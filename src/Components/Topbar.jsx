import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import { Navigate, useNavigate } from "react-router-dom";
const drawerWidth = 260;

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
   const navigate=useNavigate()
  const open = Boolean(anchorEl);
  const {name}=useContext(AuthContext)
  useEffect(()=>{
    console.log(name)
  },[])

  const Logout =()=>{
    window.location.reload()
  }
     return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "#ffffff",
          color: "#000",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", overflow: "visible" }}>
          
          {/* Left */}
          <Typography variant="h6" fontWeight="bold">
            Institute CRM
          </Typography>

          {/* Right */}
          <Box display="flex" alignItems="center" gap={2}>
            
            {/* Search */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f4f6f8",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
              }}
            >
              <SearchIcon fontSize="small" />
              <InputBase placeholder="Search..." sx={{ ml: 1, fontSize: "14px" }} />
            </Box>

            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ cursor: "pointer" }}
              onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            >
              <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
              <Typography fontSize="14px">{name}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            onMouseLeave: () => setAnchorEl(null),
          }}
          PaperProps={{
            sx: {
              minWidth: 160,
              borderRadius: 2,
            },
          }}
        >
          <MenuItem>
            <Button fullWidth color="error"
              onClick={Logout}
            >
              Logout
            </Button>
          </MenuItem>
    </Menu>
    </>
  );
};

export default Topbar;

