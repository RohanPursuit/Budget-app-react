import axios from "axios";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"

const URL = process.env.REACT_APP_URL

function SignIn() {
    const nav = useNavigate()
    console.log("SignIn")
    const [login , setUserInfo] = useState({
        userName: "john",
        password: "TheBeast69"
    })

    const handleChange = (event) => {
        console.log(login, event.target.name)
        setUserInfo({...login, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //check server to validate userName and password
        axios
        .get(`${URL}/budget/user/signin`, {params: login})
        .then(response => {
            document.cookie = `loginCred=${response.data}; path=/`
            //if credentials are valid set document.cookie and navigate back to home page
            // document.cookie = "userName=john"
        })
        .then(() => nav('/'))  

    }

    return (
      <div className="App">
          <h2>Sign In</h2>
        <form onSubmit={handleSubmit} action="">
            <label htmlFor="UserName">User Name:</label>
            <input type="text" id="UserName" name="userName" value={login.userName} onChange={handleChange} required/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" value={login.password} onChange={handleChange}  required/>
            <input type="submit" />
        </form>
        <Link to="/signup">
            SignUp
        </Link>
      </div>
    );
  }
  
  export default SignIn;