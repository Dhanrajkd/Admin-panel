// context/AuthContext.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isemail,setisemail]=useState(false)
  const [name,setname]=useState("")
  const login = async (email, password) => {
    try {
      let responce=await fetch("https://admin-panel-backend-luhq.onrender.com/api/admin/check_admin",{
        method:'POST',
        headers:{
          accept:"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      })
      let responcedata= await responce.json()
      if(responcedata.success){
        console.log("verify success")
        setname(responcedata.name)
        setIsLoggedIn(true)
      }
      else{
        alert("invalidpassword")
        setIsLoggedIn(false)
      }
    }
    catch(err){
      console.log(err)
    }
  };
  const checkemail=async (email)=>{
      try {
      let responce=await fetch("https://admin-panel-backend-luhq.onrender.com/api/admin/check_email",{
        method:'POST',
        headers:{
          accept:"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
      })
      let responcedata= await responce.json()
      if(responcedata.success){
        console.log("email verify success")
        return true
      }
      else{
        alert("invalidemail")
        return false
      }
    }
    catch(err){
      console.log(err)
    }
  }
  const addnew_pass=async (email,password)=>{
      try{
          let responce=await fetch("https://admin-panel-backend-luhq.onrender.com/api/admin/new_password",{
            method:"PATCH",
            headers:{
              accept:"application/json",
              "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
          })
          const responcedata=await responce.json()

          if(responcedata.success){
              return true
          }
          else{
            return false
          }
      }
      catch(err){
        console.log(err)
      }
  }
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,checkemail,isemail,addnew_pass,name }}>
      {children}
    </AuthContext.Provider>
  );
};
