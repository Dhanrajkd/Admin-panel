import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Box, Paper, Typography,Grid } from "@mui/material";

const StudentCourseChart = ({ students,date,payments}) => {
  console.log(students)
  console.log("date:",date)
  console.log("payments",payments)
 const chartData = [];

const courseCount = {};
const filteredStudents = date
  ? students.filter((s) => {
      const newdate = new Date(s.createdAt);

      const month = `${newdate.getFullYear()}-${String(
        newdate.getMonth() + 1
      ).padStart(2, "0")}`;

      return month === date;
    })
  : students;
    console.log(filteredStudents)
  const filteredpaymentdata = date
  ? payments.filter((s) => {
      const newdate = new Date(s.createdAt);

      const month = `${newdate.getFullYear()}-${String(
        newdate.getMonth() + 1
      ).padStart(2, "0")}`;
      console.log("month",month)
      return month === date;
    })
  : payments;
    console.log(filteredpaymentdata)
filteredStudents.forEach(s => {
  const course = s.course;
  if (courseCount[course]) {
    courseCount[course] += 1;
  } else {
    courseCount[course] = 1;
  }
});
for (const [course, count] of Object.entries(courseCount)) {
  chartData.push({ course, students: count });
}
console.log(chartData);
 
  const filteredpayments=filteredpaymentdata.reduce((acc,student)=>{
        const amount = Number(student.paidAmount);
        if(isNaN(amount))return acc
      acc[student.course]= (acc[student.course] || 0) +amount
      return acc
  },{})
  console.log(filteredpayments)
  const chartdata=Object.entries(filteredpayments).map(
    ([course,totalfees])=>({
      course,
      totalfees
    })
  )
  console.log(chartdata)
  
    const COLORS = ["#1976d2", "#9c27b0", "#ff9800"];
  return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Students by Technology
        </Typography>
         <div style={{ width: "50%", height:300}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
        </div>
        <Typography variant="h6" mb={2}>
          Students Fess
        </Typography>
          <div style={{ width: "100%", height: 300, justifyContent:"flex-start"}}>
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={chartdata}
                  dataKey="totalfees"
                  nameKey="course"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartdata.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
      </Paper>
  );
};

export default StudentCourseChart;
