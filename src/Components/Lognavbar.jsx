import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import logo from '../Logo/logo-png.png'
const Lognavbar = () => {
  return (
    <AppBar
        position="fixed"
        elevation={0}
        sx={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e0e0e0",
        }}
        >
        <Toolbar sx={{ minHeight: 56 }}>
            <Box sx={{ width:"100%",display: "flex", alignItems: "center",justifyContent:"space-between" }}>
                <Box
                    component="img"
                    src={logo}
                    alt="logo"
                    sx={{
                    width: 260,
                    height:100
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "#333" }}
                >
                    Admin Portal
                </Typography>
                
                <Typography variant="h6" sx={{ color: "#777" }}>
                Secure Access
                </Typography>
            </Box>
        </Toolbar>
    </AppBar>

  );
};

export default Lognavbar;
