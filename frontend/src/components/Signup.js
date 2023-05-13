import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    const {name,email,password}=credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/createuser",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"},
            
            body: JSON.stringify({ name,email,password}),
            
    });
    
    const json = await response.json();
    console.log(json);
    if (json.success){
      localStorage.setItem("token",json.authtoken)
      navigate("/")
      props.showAlert("Account Created Successfully","success")
    }
    else{
     props.showAlert("Invalid creadential","danger")
    }

}

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label> 
    <input type="name" name="name" className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name="email"className="form-control" id="email" onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password " className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="password" onChange={onChange}required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword " className="form-label"> Confirm Password</label>
    <input type="password"name="cname" className="form-control" id="cpassword" onChange={onChange} required minLength={5}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
