import { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import StudentCourseChart from '../Components/Studentschart'

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [month,setmonth]=useState("")
  const [payments,setpayments]=useState([])
  useEffect(()=>{
    console.log(month)
  },[month])
  useEffect(() => {
    const fetchdata=async (req,res)=>{
         const token=localstorage.getitem("authtoken")
      try{
        const responce= await fetch("https://admin-panel-backend-m7do.onrender.com/api/admin/get_studentdata")
        let data=await responce.json()
        setStudents(data.data)
        console.log(data.data)
      }
      catch(err){
        console.log(err)
      }
    }
      fetchdata()
    },[]);
      
    useEffect(()=>{
      const fetchdata=async ()=>{
                  try{
                   
                    const responce=await fetch(`https://admin-panel-backend-m7do.onrender.com/api/admin/get_fees`,{

                    })
                    const data=await responce.json()
                    console.log(data.data)
                    setpayments(data.data)
                  }
                    catch(err){
                      console.log(err)
                    }
              }
              fetchdata()
    },[])
    console.log(payments)
  return (
    <Grid container spacing={3}display="flex" flexDirection="column">
  
  <Grid item xs={12} md={4}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Total Students</Typography>
          <Typography variant="h4">{students.length}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Student Payments</Typography>
          <Typography variant="h4">{students.length}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Filter by month</Typography>
          <input type="month" 
            value={month}
            onChange={(e)=>setmonth(e.target.value)}
          />
        </Paper>
      </Grid>
    </Grid>
  </Grid>

  <Grid item xs={12} md={8} >
    <StudentCourseChart students={students} date={month} payments={payments} />
  </Grid>

  </Grid>

  );
};

export default Dashboard;

