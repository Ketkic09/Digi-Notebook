import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import bg from './../images/bg.svg'

const Signup = (props) => {
  let navigate = useNavigate()
  const host = 'http://localhost:5000/'
  const [user,setUser] = useState({name:"",email:"",password:"",password2:""})
  const [see,setSee] = useState(false)
  const onChange = (e)=>{
    setUser({...user,[e.target.name]: e.target.value})
  }

  const handleSignup = async(e)=>{
    e.preventDefault()
    const response = await fetch(`${host}api/auth/createuser`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:user.name,email:user.email,password:user.password2})
    })
    const json = await response.json()
    if(json.success) {
     //saving auth-token to redirect
     localStorage.setItem('token',json.authToken)
     props.showAlert("Regitered in successfully!","success")
     navigate("/") 
    }
    else{
      props.showAlert("Something went wrong","danger")
      navigate("/signup")
    }
  }

  
  return (
    <> 
      <div className='d-flex justify-content-between'>
      <img src={bg} alt="background" className='d-none d-sm-block'></img>
      <div className="d-inline-block p-4 bg-dark text-white col-md-6">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="name" className="form-control" id="name" name="name" value={user.name} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter your name" minLength={2} required/>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" name="email" onChange={onChange} value={user.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type={see? "text":"password"} className="form-control" name="password" onChange={onChange} value={user.password} id="exampleInputPassword1" placeholder="Password"  minLength={8} required/>
          <i className={see?"fa-solid fa-eye":"fa-solid fa-eye-slash"} onClick={()=>{setSee(!see)}}></i>
          <small id="passwordHelp" className="form-text text-muted mx-2">Your password should atleast have 8 characters</small>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="password" className="form-control" name="password2" onChange={onChange} value={user.password2} id="exampleInputPassword2" placeholder="Password" minLength={8} required/>
        </div>
        {user.password.length!==0 || user.password2.length !==0 ? user.password !== user.password2? <small className='text-danger mt-2'>Passwords don't match :(</small>:<small className='text-success mt-2'>Passwords match :)</small>:<small></small>}
        <br></br>
        
        <button type="submit" className="btn btn-light mt-2" disabled={user.password !== user.password2 || user.name.length<2 }>SignUp</button>
        <br></br>
        <small className='text-muted'>Already have an account?</small>&nbsp;
        <Link to="/login">Login</Link>
      </form>
      </div>
      </div>
      

    </>
    
  )
}

export default Signup