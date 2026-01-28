import { useState,useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Chip,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    fee: "",
    status: "Active",
  });
  useEffect(()=>{
          const fetchdata=async ()=>{
            const responce=await fetch("https://admin-panel-backend-m7do.onrender.com/api/admin/cource_data")
            const data=await responce.json()
            console.log(data.data)
            setCourses(data.data)
          }
          fetchdata()
        },[])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (editId) {
      setCourses(
        courses.map((c) =>
          c.id === editId ? { ...c, ...formData } : c
        )
      );
    } else {
     console.log(formData)
      try{
        let responce=await fetch("https://admin-panel-backend-m7do.onrender.com/api/admin/add_cource",{
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

    setOpen(false);
    setEditId(null);
    setFormData({ name: "", duration: "", fee: "", status: "Active" });
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditId(course.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Courses</h2>
        <Button
          variant="contained"
          sx={{
            height:"40px"
          }}
          onClick={() => setOpen(true)}
        >
          Add Course
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Fee (₹)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id} hover>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>{course.fee}</TableCell>
              <TableCell>
                <Chip
                  label={course.status}
                  color={course.status === "Active" ? "success" : "default"}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(course)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(course.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {courses.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No courses added
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          {editId ? "Edit Course" : "Add Course"}
        </DialogTitle>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Course Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
            <TextField
              label="Fee"
              name="fee"
              type="number"
              value={formData.fee}
              onChange={handleChange}
            />
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Courses;
