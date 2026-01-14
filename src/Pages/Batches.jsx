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

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    batchName: "",
    course: "",
    trainer: "",
    startDate: "",
    time: "",
    studentsCount: "",
    status: "Upcoming",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
          const fetchdata=async ()=>{
            const responce=await fetch("https://admin-panel-backend-m7do.onrender.com/api/admin/get_batch")
            const data=await responce.json()
            console.log(data.data)
            setBatches(data.data)
          }
          fetchdata()
        },[])
  const handleSave = async () => {
    if (editId) {
      setBatches(
        batches.map((b) =>
          b.id === editId ? { ...b, ...formData } : b
        )
      );
    } else {
       console.log(formData)
      try{
        let responce=await fetch("https://admin-panel-backend-m7do.onrender.com/api/admin/add_batch",{
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
    setFormData({
      batchName: "",
      course: "",
      trainer: "",
      startDate: "",
      time: "",
      studentsCount: "",
      status: "Upcoming",
    });
  };

  const handleEdit = (batch) => {
    setFormData(batch);
    setEditId(batch.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setBatches(batches.filter((b) => b.id !== id));
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Batches</h2>
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpen(true)}
          sx={{
            height:"40px"
          }}
        >
          Add Batch
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Batch Name</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Trainer</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Students</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {batches.map((batch) => (
            <TableRow key={batch.id} hover>
              <TableCell>{batch.batchName}</TableCell>
              <TableCell>{batch.course}</TableCell>
              <TableCell>{batch.trainer}</TableCell>
              <TableCell>{batch.startDate}</TableCell>
              <TableCell>{batch.time}</TableCell>
              <TableCell>{batch.studentsCount}</TableCell>
              <TableCell>
                <Chip
                  label={batch.status}
                  size="small"
                  color={
                    batch.status === "Running"
                      ? "success"
                      : batch.status === "Completed"
                      ? "default"
                      : "warning"
                  }
                />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(batch)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(batch.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {batches.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No batches created
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          {editId ? "Edit Batch" : "Add Batch"}
        </DialogTitle>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Batch Name"
              name="batchName"
              value={formData.batchName}
              onChange={handleChange}
            />
            <TextField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
            <TextField
              label="Trainer"
              name="trainer"
              value={formData.trainer}
              onChange={handleChange}
            />
            <TextField
              type="date"
              label="Start Date"
              name="startDate"
              InputLabelProps={{ shrink: true }}
              value={formData.startDate}
              onChange={handleChange}
            />
            <TextField
              label="Time Slot"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
            <TextField
              label="Students Count"
              name="studentsCount"
              type="number"
              value={formData.studentsCount}
              onChange={handleChange}
            />
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="Upcoming">Upcoming</MenuItem>
              <MenuItem value="Running">Running</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
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

export default Batches;
