import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Result } from 'postcss';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';


const auth =getAuth(app)


const Login = () => {
    const [error,setError] =useState('')
    const [success, setSuccess] = useState("");
    const emailRef  =useRef()
    const [visible, setVisible] =useState(false)

    const handleLogin =(event) =>{
        event.preventDefault();
        const form =event.target
        const email =form.email.value
        const password = form.password.value
        console.log(email,password)

        // validation
        setError('')
        setSuccess('')

        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please at least add ! uppercase letter!')
            return
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser =result.user
            console.log(loggedUser)
            event.target.reset();
            setSuccess('User login successful')
            setError('')
        })
        .catch(error =>{
           setError(error.message)
        })
    }
    const handlePasswordReset = event => {
      const email =emailRef.current.value
      if(!email){
        alert('Please provide email to reset password')
        return
      }

      sendPasswordResetEmail(auth,email)
      .then( ()=>{
        alert('Please check your email')
      })
      .catch(error => {
        console.log(error)
        setError(error.message)
      })
    }
    
    return (
        <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Please Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
           Email Address
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="email"
            id="username"
            name='email'
            placeholder='Enter Email'
            ref={emailRef}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type={visible ? 'text' : 'password'}
            id="password"
            name='password'
            placeholder='Enter password'
            required
          />
        </div>
        <button onClick={() =>{setVisible(!visible)}} className='p-2 text-blue-400'>Show password</button>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          type="submit"
        >
          Log In
        </button>
        <p>Forgotten password ? <button onClick={handlePasswordReset} className='text-blue-500 underline'>Reset password</button></p>
        <p><small>New to this website ? Please <Link to='/register ' className="text-blue-500">Register</Link></small></p>
        <p className='text-blue-500'>{success}</p>
      <p className='text-red-500'>{error}</p>
      </form>
    
    </div>
    );
};

export default Login;