import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {

        const[email, setEmail] = useState();
        const[password, setPassword] = useState();
        const navigate = useNavigate();

         const handleSubmit = (e)=>{
                e.preventDefault();
                axios.post('http://localhost:3000/login', {email, password})
                .then(result=> {
                    if(result.data === 'successfully login'){
                        navigate('/home')
                        
                    }
                })
                .catch(err=> console.log(err))
                
                
            }

  return (
    <div className='container'>
      <div className='parent'>
        <h2 className='heading'>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>
                    <strong>Email</strong>
                </label><br />
                <input type="email" 
                placeholder='Enter email'
                autoComplete='off'
                name='email'
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='email'>
                    <strong>Password</strong>
                </label><br />
                <input type="password" 
                placeholder='Enter password'
                autoComplete='off'
                name='password'
                onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button type='submit' className='reg-btn'>
                Login
            </button>
        </form>
        <p>No have account <Link to='/register' className='log-btn'> Register</Link></p>
      </div>
    </div>
  )
}

export default Login
