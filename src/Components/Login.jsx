// pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'
import {
  Dialog,
  Typography,
   Button,
   TextField,
   DialogContent,
   Stack,
   Box,
   DialogTitle
} from "@mui/material"
import Lognavbar from "./Lognavbar";
const Login = () => {
  const { login } = useContext(AuthContext);
  const {checkemail}=useContext(AuthContext)
  const {isemail}=useContext(AuthContext)
  const {addnew_pass}=useContext(AuthContext)
  const navigate = useNavigate();

  const [checkadmin,setcheckadmin] = useState({
    email:"",
    password:""
  });
  const [email,setemail]=useState("")
  const [password, setPassword] = useState("");
   const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [newpass,setnewpass]=useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(newpass){
      console.log("newpass working")
      const updated=await addnew_pass(email,password)
      if(updated){
        alert("password updated")
        setOpen(false)
        setnewpass(false)
      }
      else{
        alert("failed")
      }
    }
    else{
      console.log()
      if (login(email, password)) {
        navigate("/dashboard");
      } else {
        alert("invalid password or email")
      }
  }
  };
  const handleemail=async ()=>{
    const ismail=await checkemail(email)
    try{
         if(ismail){
          setnewpass(true)
          alert("email verfication success")
        }
        else{
          alert("email not valid")
        }
    }
   catch(err){
      console.log(err)
   }
    
  }
  const handlechange=(e)=>{

  }
  return (
    <>
    <Lognavbar/>
    <div style={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center", height: "100vh",width:"100vw" }}>
      <form onSubmit={handleSubmit} style={{ padding: "30px", border: "1px solid #ccc", borderRadius: "10px",width:"400px",height:"auto" }}>
        <h2 style={{paddingBottom:"10px"}}>Admin Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "10px" }}
        />
          <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Login</button>
        <p className="forget_pass"
          onClick={(e)=>setOpen(true)}
        >
          Forget password
          </p>
      </form>
      <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm">
         <DialogContent  
            PaperProps={{
            sx: {
              borderRadius: 4,
              p: 1,
            },
          }}
         >
          <DialogTitle align="center" >
            Check Email
          </DialogTitle>
           <Stack spacing={2} mt={1}>
              <TextField
                label="Enteremail"
                name="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
              >
              </TextField>
                {newpass ?(
                <TextField
                  label="Enter new password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                >
                </TextField>
                ):null}
              <Box display="flex" justifyContent="center">
                   <Button
                    variant="contained"
                    onClick={!newpass? handleemail :handleSubmit}
                    >
                      {newpass ? "Update password":"Check mail"}
                    </Button>
              </Box>
           </Stack>
         </DialogContent>
      </Dialog>
      <Box sx={{mt:2,gap:2}}>
          <Typography sx={{color:"red"}}>
            Email:demo@gmail.com
          </Typography>
           <Typography>
            Password:12345678
          </Typography>
      </Box>
    </div>
    </>
  );
};
export default Login;
