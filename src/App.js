import './App.css';
import axios from "axios"
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import Nav from "./components/common/Nav"
import Home from "./pages/Home"
import ShowAll from './pages/ShowAll';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NewItem from './pages/NewItem'
import ShowItem from './pages/ShowItem';
import Edit from './pages/Edit';

const URL = process.env.REACT_APP_URL

function App() {
  const nav = useNavigate()
  const userKey = document.cookie.split(';')[0].split("=")[1]
  const [total, setTotal] = useState(0)
  const [isLoggedIn, setLoggedIn] = useState(true)

  console.log("App")

  useEffect(() => {   
    axios
    .get(`${URL}/budget`, {params: {userKey}})
    .then((response) => {
      if(response.data.info !== "You need to sign in"){
        setTotal(response.data.reduce((a, b) => {
          a = a.amount + b.amount
          return {amount: a}
        }).amount) 
      } else {
        nav('/signin')
      }
        
    })
    .catch(console.log)
  }, [])


  return (
    <div className="App">
      <Nav total={total} isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route exact path="/" element={<Home setLoggedIn={setLoggedIn} setTotal={setTotal}/>}/>
        <Route path="/budget" element={<ShowAll setTotal={setTotal}/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/budget/new" element={<NewItem/>}/>
        <Route path="/budget/edit/:index" element={<Edit/>}/>
        <Route path="/budget/show/:index" element={<ShowItem/>}/>
      </Routes>
    </div>
  );
}

export default App;
