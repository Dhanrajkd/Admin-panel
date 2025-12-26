import { useState ,useEffect} from "react";
import {
  Paper,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name:"",
    password: "",
    email: "",
    role: "",
  });
   useEffect(()=>{
        const fetchdata=async ()=>{
          const responce=await fetch("http://localhost:4000/get_admin")
          const data=await responce.json()
          console.log(data.data)
          setAdmins(data.data)
        }
        fetchdata()
      },[])
  const handleChange =  (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (editId) {
      setAdmins(
        admins.map((a) =>
          a.id === editId ? { ...a, ...formData } : a
        )
      );
    } else {
      console.log(formData)
      try{
        let responce=await fetch("http://localhost:4000/add_admin",{
          method:"POST",
          headers:{
            accept:"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify(formData)
        })
          let responcedata=await responce.json()
          if(responcedata.success){
            alert(responcedata.message)
          }
          else{
            alert(responcedata.message)
          }
      }
      catch(err){
        console.log(err)
      }
    }

    setFormData({ name: "", email: "", role: "" });
    setEditId(null);
    setOpen(false);
  };

  const handleEdit = (admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
    setEditId(admin.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  const roleColor = (role) => {
    switch (role) {
      case "Super Admin":
        return "error";
      case "Manager":
        return "primary";
      default:
        return "success";
    }
  };

  return (
    <Paper sx={{p: 3, borderRadius: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <SecurityIcon color="primary" />
          <h2>Admins</h2>
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{ px: 2 }}
          onClick={() => {
            setFormData({ name: "", email: "", role: "" });
            setEditId(null);
            setOpen(true);
          }}
        >
          Add Admin
        </Button>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id} hover>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <Chip
                    label={admin.role}
                    color={roleColor(admin.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(admin)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(admin.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editId ? "Edit Admin" : "Add Admin"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
             <TextField
              label="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              <MenuItem value="Super Admin">Super Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Staff Admin">Staff Admin</MenuItem>
            </Select>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Admins;
