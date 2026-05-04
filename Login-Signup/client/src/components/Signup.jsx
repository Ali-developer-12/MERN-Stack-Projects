import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Signup() {

    const[name, setName] = useState();
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const navigate = useNavigate();
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/register', {name, email, password})
        .then(result=> console.log(result))
        .catch(err=> console.log(err))
        navigate('/login')
        
    }

  return (
    <div className='container'>
      <div className='parent'>
        <h2 className='heading'>Register</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>
                    <strong>Name</strong>
                </label><br />
                <input type="text" 
                placeholder='Enter name'
                autoComplete='off'
                name='email'
                onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='email'>
                    <strong>Email</strong>
                </label><br />
                <input type="email" 
                placeholder='Enter email'
                autoComplete='off'
                name='email'
                onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='email'>
                    <strong>Password</strong>
                </label><br />
                <input type="password" 
                placeholder='Enter password'
                autoComplete='off'
                name='password'
                onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type='submit' className='reg-btn'>
                Register
            </button>
        </form>
        <p>Already have account <Link to={'/login'} className='log-btn'> Login</Link></p>
        
      </div>
    </div>
  )
}

export default Signup
