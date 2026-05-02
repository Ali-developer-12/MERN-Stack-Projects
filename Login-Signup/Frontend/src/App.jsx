import { useState } from 'react'
import './App.css'

function App() {
  const [login, setLogin] = useState(true)

  return (
    <>
      <div className="container">
        <div className={"formBox"}>
          <h1>Login</h1>
          <input type="text" placeholder='Email'/>
          <input type="password" placeholder='password'/>
          <button>Login</button>
          <p className='toggleBtn'>
            Don't have account 
             <span> Register</span>
          </p>
        </div>
      </div> 
    </>
  )
}

export default App
