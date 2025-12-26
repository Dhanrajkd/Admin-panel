import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";


const users = [
  { id: 1, name: "Arun", email: "arun@mail.com", role: "Admin" },
  { id: 2, name: "Kumar", email: "kumar@mail.com", role: "User" },
  { id: 3, name: "Priya", email: "priya@mail.com", role: "Manager" },
];

function roleColor(role) {
  if (role === "Admin") return "error";
  if (role === "Manager") return "warning";
  return "primary";
}

function Users() {
    const [search,setsearch]=useState("")
    const [open, setOpen] = useState(false);
    const [formData,setformData]=useState({
        name: "",
        email: "",
        role: "User",
      })
      const handleChange=()=>{

      }
      const handleAddUser=()=>{

      }
  return (
    <Paper sx={{ padding: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Users
      </Typography>
      <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => setOpen(true)}
        >
        Add User
      </Button>
        <TextField
            label="Search users"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={search}
            onChange={(e) => setsearch(e.target.value)}
        />
      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f2f5" }}>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
            .filter((user)=>
             user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={roleColor(user.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>Add User</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleAddUser}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
    </Paper>
  );
}

export default Users;
