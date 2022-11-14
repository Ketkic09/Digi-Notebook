import React, {useState}from 'react'
import {Link, useNavigate} from 'react-router-dom'
import bg from './../images/bg.svg'

const Login = (props) => {
    const [user, setUser] = useState({email:"",password:""})
    let navigate = useNavigate() 
    const host = 'http://localhost:5000/'
    const onChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        
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
        console.log("user",json.name)
        if(json.success) {
            //saving auth-token to redirect
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
        <div className='d-flex justify-content-between'>
        
            <img src={bg} alt="background" height="auto" className='d-none  d-sm-block'></img>
            
            <div className="d-inline-block p-4 bg-dark text-white col-md-6">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                <div className="form-group mt-4">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" value={user.email} name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"  onChange={onChange} required/>
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value = {user.password} name = "password"className="form-control" id="password" placeholder="Password" onChange={onChange} required />    
                </div>
                <button type="submit" className="btn btn-light mt-3" disabled={user.email.length===0 || user.password.length===0}>Login</button>
                </form>
                <br></br>
                <small className='text-muted'>Don't have an account?</small>&nbsp;
                <Link to="/signup">Signup</Link>
            </div>
        
        
        
        </div>

        


    </>
  )
}

export default Login