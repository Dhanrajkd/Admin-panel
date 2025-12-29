import { useEffect, useState } from "react";
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
  Avatar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [load,setload]=useState(true)
  const [search,setSearch]=useState('')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    Specilization:"",
    image:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
      fetchdata()
     },[load])
      const fetchdata=async ()=>{
        const responce=await fetch("https://admin-panel-backend-luhq.onrender.com/api/admin/get_empdata")
        const data=await responce.json()
        console.log(data.data)
        setEmployees(data.data)
      }
    const addfile=(e)=>{
      const file=e.target.files[0]
      setFormData((prev)=>({...prev,image:file}))
    }
  const handleSubmit = async () => {
    if (editId) {
         try{
      console.log(editId)
      const responce =await fetch(`https://admin-panel-backend-luhq.onrender.com/api/admin/edit_emp/${editId}`,{
        method:"PUT",
        headers:{
          accept:"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const responcedata=await responce.json()
      if(responcedata.success){
        alert("success")
        setOpen(false)
        fetchdata()
      }
      else{
        alert("failed")
      }
    }
    catch(err){
      console.log(err)
    }
    } 
    else {
     console.log(formData)
        const data=new FormData()
        data.append("name",formData.name)
        data.append("email",formData.email)
        data.append("role",formData.role)
        data.append("Specilization",formData.Specilization)
        data.append("image",formData.image)
      try{
          let responce=await fetch("https://admin-panel-backend-luhq.onrender.com/api/admin/add_employee",{
            method:"POST",
            body:data
          })
          let responcedata=await responce.json()
          if(responcedata.success){
            alert("Data added")
          }
      }
      catch(err){
        console.log(err)
      }

    }
    setFormData({ name: "", email: "", role: "", Specilization: "" });
    setEditId(null);
    setOpen(false);
  };

  const handleEdit = (emp) => {
    setFormData({
      name: emp.name,
      email: emp.email,
      role: emp.role,
      Specilization: emp.Specilization,
    });
    setEditId(emp._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
      try{
      const responce=await fetch(`https://admin-panel-backend-luhq.onrender.com/api/admin/emp_delete/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
        }
      })
      let responcedata=await responce.json()
      if(responcedata.success){
        alert("Successfully deleted")
        setload(false)
      }
      else{
        alert("failed")
      }
    }
    catch(err){
      console.log(err)
  };
  }
  const filteredemployees=employees.filter((emp)=>{
      const matchsearch=
      emp.name.toLowerCase().includes(search.toLowerCase())||
      emp.email.toLowerCase().includes(search.toLowerCase())
      return matchsearch
  })
  const [page,setpage]=useState(0)
  const maxpage=5
  const paginatedemployees=filteredemployees.slice(
    page *maxpage,page+maxpage
  )
  return (
    <Paper sx={{p: 3, borderRadius: 3 }}>
       <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search name or email"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <h2>Employees</h2>
        <Button
          variant="contained"
          size="small"
          sx={{ px: 2 }}
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              role: "",
              department: "",
            });
            setEditId(null);
            setOpen(true);
          }}
        >
          Add Employee
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Specilization</b></TableCell>
              <TableCell align="center"><b>Image</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedemployees.map((emp) => (
              <TableRow key={emp.id} hover>
                <TableCell>
                  <Typography fontWeight={600} fontSize={14}>
                     {emp.name} 
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} fontSize={14}>
                    {emp.email}
                  </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontWeight={600} fontSize={14}>
                        {emp.role}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={600} fontSize={14}>
                  {emp.Specilization}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                   <Avatar
                      src={emp.image}
                      alt={emp.name}
                      sx={{ 
                      width: 50, 
                      height: 50,
                      transition:"transform 0.3s ease",
                        "&:hover":{
                          transform:"scale(1.8)",
                          zIndex:10,
                          }}}
                      />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(emp)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(emp._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
          <Box display="flex" justifyContent="flex-end" gap={2}mt={2}>
            <Button
            variant="outlined"
            onClick=""
            >
              Prev
            </Button>
            <Button
            variant="outlined"
            onClick=""
            >
              Next
            </Button>
          </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editId ? "Edit Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
           <Select 
            name="Specilization"
            value={formData.Specilization}
            onChange={handleChange}
            displayEmpty
           >
            <MenuItem value="">
               <em>Specialization</em>
            </MenuItem>
            <MenuItem value="Fullstack">Fullstack</MenuItem>
            <MenuItem value="Frontend">Frontend</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Data-analytics">Data-analytics</MenuItem>
           </Select>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Role
              </MenuItem>
              <MenuItem value="Tutor">Tutor</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Operations">Operations</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </Select>
            <input
              type="file"
              accept="image/*"
              onChange={(e)=>addfile(e)}
            />
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

export default Employees;
