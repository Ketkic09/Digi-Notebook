import React, {useState}from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [user, setUser] = useState({email:"",password:""})
    let navigate = useNavigate() 
    const host = 'http://localhost:5000/'
    const onChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        console.log(user)
    }
    const handleLogin=async(e)=>{
        e.preventDefault()
        const response = await fetch(`${host}api/auth/login`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:user.email,password:user.password})
        })
        if(response === null ){
            console.log("user not found")
        }
        const json = await response.json()
        setUser({email:"",password:""})
        if(json.success) {
            //saving auth-token to redirect
            console.log('[login.js] success authtoken',json.authToken)
            localStorage.setItem('token',json.authToken)
            props.showAlert("Logged in successfully!","success")
            navigate("/")
        }
        else{
            props.showAlert("Invalid credentials","danger")
        }

  
    }
    return (
    <>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" value={user.email} name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"  onChange={onChange} required/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" value = {user.password} name = "password"className="form-control" id="password" placeholder="Password" onChange={onChange} required />
                
            </div>
            <button type="submit" className="btn btn-primary mt-2" disabled={user.email.length===0 || user.password.length===0}>Submit</button>
            
        </form>


    </>
  )
}

export default Login