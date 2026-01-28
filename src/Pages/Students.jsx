import { useState,useEffect } from "react";
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
  TablePagination,
  Typography,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar } from "@mui/material";
const Students = () => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); 
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    date:"",
    image:""
  });
 
  const [load,setload]=useState(true)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [students, setStudents] = useState([]);
  const [page,setpage]=useState(1)
  const [limit,setlimit]=useState(5)
  const [totalPages,setTotalPages] = useState(1);
  useEffect(()=>{
      fetchdata(page)
    },[page])
    const fetchdata=async (pageNumber = 1)=>{
      const token=localStorage.getItem("authtoken")
      console.log(pageNumber)
      try{
          let responce= await fetch(`https://admin-panel-backend-m7do.onrender.com/api/admin/get_studentdata?page=${pageNumber}&limit=${limit}`,{
            method:"GET",
            headers:{
              accept:"application/json",
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
            }
          })
          let data=await responce.json()
          console.log(data.data)
          console.log(data.totalpages)
          setStudents(data.data)
          setpage(data.page)
          setTotalPages(data.totalpages)
      }
      catch(err){
        console.log(err)
      }
    }
  const filestore=(e)=>{
    const file=e.target.files[0]
    setFormData((prev)=>({...prev,image:file}))
  }
  const handleSubmit = async() => {
    if (editId) {
     try{
      console.log(editId)
      const responce =await fetch(`https://admin-panel-backend-m7do.onrender.com/api/admin/edit_stu/${editId}`,{
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
    } else {
      console.log(formData)
      try{
        const data=new FormData()
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("course", formData.course);
            data.append("image", formData.image);
            const token=localStorage.getItem("authtoken")
          const responce=await fetch("https://admin-panel-backend-m7do.onrender.com/api/admin/addstudent",{
            method:"POST",
            headers:{
              Authorization:`Bearer ${token}`
            },
            body:data
          })
          let responcedata=await responce.json()
          if(responcedata.success){
            alert(responcedata.message)
           fetchdata()
          }
          else{
            alert(responcedata.message)
          }
      }
      catch(err){
          console.log(err)
      }
    }
    setEditId(null);
    setOpen(false);
  };

  const handleEdit =async (student) => {
    console.log(student)
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
    });
    
    setEditId(student._id);
    setOpen(true);
  };
  const handleDelete = async(id) => {
    try{
      const token=localStorage.getItem("authtoken")
      const responce=await fetch(`https://admin-panel-backend-m7do.onrender.com/api/admin/stu_delete/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        }
      })
      let responcedata=await responce.json()
      if(responcedata.success){
        alert("Successfully deleted")
        fetchdata()
      }
      else{
        alert(responcedata.message)
      }
    }
    catch(err){
      console.log(err)
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter ? s.course === courseFilter : true;
    return matchSearch && matchCourse;
  });
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Students</h2>
        <Button
          variant="contained"
          size="small"
          sx={
            {
              height:"fit-content",
               px: 1, 
               py: 0.5 ,
               minHeight:0
            }
          }
          onClick={() => {
            setFormData({ name: "", email: "", course: "" });
            setEditId(null);
            setOpen(true);
          }}
        >
          Add Student
        </Button>
      </Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search name or email"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Courses</MenuItem>
          <MenuItem value="Frontend">Frontend</MenuItem>
          <MenuItem value="Fullstack">Fullstack</MenuItem>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Data Analytics">Data Analytics</MenuItem>
        </Select>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#f5f7fa" }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Course</b></TableCell>
              <TableCell align="center"><b>image</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>
                 <Typography fontWeight={600} fontSize={14}>
                  {s.name}
                </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} fontSize={14}>
                    {s.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} fontSize={14}>
                    {s.course}
                  </Typography>
                  </TableCell>
                <TableCell align="center">
                  <Avatar
                    src={s.image}
                    alt={s.name}
                    sx={{ 
                      width: 50, 
                      height: 50,
                      transition:"transform 0.3s ease",
                      "&:hover":{
                        transform:"scale(1.8)",
                        zIndex:10,
                      }
                      }
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(s)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(s._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button
            variant="outlined"
            onClick={() => setpage(page - 1)}
            disabled={page===1}
          >
            Prev
          </Button>
          <Button
            variant="outlined"
            onClick={() => setpage(page + 1)}
            disabled={page===totalPages}
          >
            Next
          </Button>
        </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editId ? "Edit Student" : "Add Student"}
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
              name="course"
              value={formData.course}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Course</MenuItem>
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Fullstack">Fullstack</MenuItem>
              <MenuItem value="Data science">React</MenuItem>
              <MenuItem value="Data Analytics">Data Analytics</MenuItem>
              <MenuItem value="Machine learning">Machine learning</MenuItem>
            </Select>
            <input
              type="file"
              accept="image/*"
              onChange={(e)=>filestore(e)}
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

export default Students;
