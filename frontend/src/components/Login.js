import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const Login = (props) => {

const [credentials, setCredentials] = useState({email:"",password:""})
const navigate = useNavigate();


    const handleSubmit=async(e,email, password)=>{
        e.preventDefault();
        const response = await fetch("https://inotebook-atru.onrender.com/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                'Accept': 'application/json'},
                
                body: JSON.stringify({ email:credentials.email, password:credentials.password }),
                
        });
        
        const json = await response.json();
        console.log(json);
        if (json.success){
          localStorage.setItem("token",json.authtoken)
          props.showAlert("Logged In Successfully","success")
          navigate("/")
        }
        else{
          props.showAlert("Invalid credentials","danger")
        }

    }
    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }


  return (
    <div className='container'>
    <form onSubmit={handleSubmit} >
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email"value={credentials.email} onChange={onChange}className="form-control" id="email" aria-describedby="email" name="email"placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" value={credentials.password} onChange={onChange} name="password"className="form-control" id="password" placeholder="Password"/>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    {/* <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label> */}
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
