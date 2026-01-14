
import { useState,useEffect} from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Fees = () => {
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    totalFees: "",
    paidAmount: "",
    paymentMode: "Cash",
    date: "",
  });
   useEffect(()=>{
       fetchdata()
    },[])
        const fetchdata=async ()=>{
            try{
              const responce=await fetch("https://admin-panel-backend-m7do.onrender.com/api/admin/get_fees")
              const data=await responce.json()
              console.log(data.data)
              setPayments(data.data)
            }
              catch(err){
                console.log(err)
              }
        }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPayment = async () => {
    const balance =
      Number(formData.totalFees) - Number(formData.paidAmount);

    const status =
      balance === 0 ? "Paid" : balance < formData.totalFees ? "Partial" : "Pending";
       console.log(formData)
      try{
        console.log(formData)
        let responce=await fetch("https://admin-panel-backend-m7do.onrender.com/api/admin/add_fees",{
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
            fetchdata()
          }
          else{
            alert(responcedata.message)
          }
      }
      catch(err){
        console.log(err)
      }

    /* setPayments([
      ...payments,
      {
        id: Date.now(),
        ...formData,
        balance,
        status,
      },
    ]); */
    setOpen(false);
    setFormData({
      studentName: "",
      course: "",
      totalFees: "",
      paidAmount: "",
      paymentMode: "Cash",
      date: "",
    });
  };

  const handleDelete = (id) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <h2>Fees & Payments</h2>
        <Button variant="contained" size="small" onClick={() => setOpen(true)}>
          Add Payment
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Total Fees (₹)</TableCell>
            <TableCell>Paid (₹)</TableCell>
            <TableCell>Balance (₹)</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.studentName}</TableCell>
              <TableCell>{p.course}</TableCell>
              <TableCell>₹{p.totalFees}</TableCell>
              <TableCell>₹{p.paidAmount}</TableCell>
              <TableCell>₹{p.totalFees-p.paidAmount}</TableCell>
              <TableCell>{p.paymentMode}</TableCell>
              <TableCell>
                <Chip
                  label={p.status}
                  size="small"
                  color={
                    p.status === "Paid"
                      ? "success"
                      : p.status === "Partial"
                      ? "warning"
                      : "error"
                  }
                />
              </TableCell>
              <TableCell align="right">
                <IconButton color="error" onClick={() => handleDelete(p.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {payments.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No payment records
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Email"
              name="Email"
              value={formData.studentName}
              onChange={handleChange}
            />
            <TextField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
            <TextField
              label="Total Fees"
              name="totalFees"
              type="number"
              value={formData.totalFees}
              onChange={handleChange}
            />
            <TextField
              label="Paid Amount"
              name="paidAmount"
              type="number"
              value={formData.paidAmount}
              onChange={handleChange}
            />
            <Select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </Select>
            <TextField
              type="date"
              label="Payment Date"
              name="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddPayment}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Fees;
