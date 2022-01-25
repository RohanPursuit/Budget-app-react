import {useState} from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const URL = process.env.REACT_APP_URL

function SignUp() {
    const nav = useNavigate()

    const [newUser, setNewUser] = useState({})

    const handleChange = (event) => {
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`${URL}/budget/user/signup`, newUser)
        .then(() => {
            nav("/signin")
        })
    }

    return (
      <div className="App">
          <h2>Sign Up</h2>
        <form  onChange={handleChange} onSubmit={handleSubmit} action="">
            <label htmlFor="UserName">User Name: </label>
            <input type="text" id="UserName" name="userName" required/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" required/>
            <input type="submit" />
        </form>
        <Link to="/signin">
            SignIn
        </Link>
      </div>
    );
}
  
  export default SignUp;