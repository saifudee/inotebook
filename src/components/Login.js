import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const[cred,setCred]=useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/loginuser",{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({email:cred.email,password:cred.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully", "success");
            navigate("/");
        }
        else{
          props.showAlert("Invalid User", "danger");
        }
      }
      const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
      }
  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={cred.email} onChange={onChange}aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={cred.password} />
  </div>
  <button  type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}

export default Login