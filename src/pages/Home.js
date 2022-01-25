import {useNavigate} from "react-router-dom"
import {useEffect} from "react"
import axios from "axios"

const URL = process.env.REACT_APP_URL

function Home({setLoggedIn, setTotal}) {
    const nav = useNavigate()
    console.log("Home")
    //check if user is signed in **use document.cookie
    const userKey = document.cookie.split(';')[0].split('=')[1]

    //if not signed in redirect user to signin page
    useEffect(()=> {
        axios.get(`${URL}/budget`, {params: {userKey}})
        .then(response => {
            if(response.data.info === "You need to sign in"){
                setLoggedIn(false)
                nav('/signin')
            } else {
                setLoggedIn(true)
                setTotal(response.data.reduce((a, b) => {
                    a = a.amount + b.amount
                    return {amount: a}
                  }).amount)
            }
        })
    })
    
        //else welcome user and show user over all stats
    return (
      <div className="App">
        <h2>Home</h2>
      </div>
    );
  }
  
  export default Home;