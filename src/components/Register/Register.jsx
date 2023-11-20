import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name =event.target.name.value
    console.log(name,email, password);
    setError('');
    setSuccess('');
    // validate password
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one uppercase word");
      return;
    } else if (!/(?=.*[0-9])/.test(password)) {
      setError("Please add at least one Digit");
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("Please add at least one special character");
      return;
    }

    // create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("User has been created successfully");
        sendVerificationEmail(result.user)
        updateUserProfile(result.user, name)
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleEmailChange = (event) => {
    // console.log(event.target.value);
    // setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    // console.log(event.target.value)
  };
  const sendVerificationEmail = (user) =>{
  sendEmailVerification(user)
  .then(result=>{
    console.log(result)
    alert('Please verify your email address')
  })
  }
  const updateUserProfile = (user,name)  =>{
    updateProfile(user,{
      displayName: name
    })
    .then(() =>{
      alert('user profile updated')
    })
    .catch(error =>{
      console.log(error)
      setError(error.message)
    })
  }

  return (
    <div className="px-4 mx-auto  w-52">
      <h1 className="mb-2 text-lg font-bold">Please Register!</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          className="border-2 border-black rounded-md mb-2 px-2 w-64"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          required
        />
        <br />
        <input
          onChange={handleEmailChange}
          className="border-2 border-black rounded-md mb-2 px-2 w-64"
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          required
        />
        <br />
        <input
          className="border-2 border-black rounded-md mb-2 px-2 w-64"
          onBlur={handlePasswordChange}
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          required
        />
        <br />
        <p className="text-red-500">{error}</p>
        <input
          className="rounded-md font-medium p-2 bg-blue-500 text-gray-100"
          type="submit"
          value="Register"
        />
      </form>
      <br />
      <p><small>Already have an account ? Please <Link to='/login' className="text-blue-500">Login</Link></small></p>
      <p className="text-blue-500">{success}</p>
    </div>
  );
};

export default Register;
