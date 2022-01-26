import {useState, useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const URL = process.env.REACT_APP_URL

function NewTransaction() {
    const nav = useNavigate()

    const userKey = document.cookie.split(';')[0].split("=")[1]
    const [transaction ,setTransaction] = useState({})

    const handleChange = (event) => {
        if(event.target.name === "amount"){
            setTransaction({...transaction, amount: Number(event.target.value)})
        } else {
            setTransaction({...transaction, [event.target.name]: event.target.value})
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`${URL}/budget`, {
            userKey, transaction
        })
        .then(response => {
            nav("/budget/show/0")
        })
    }

    useEffect(()=> {
        axios.get(`${URL}/budget`, {
            params: {
                userKey
            }
        })
        .then(response => {
            if(response.data.info === "You need to sign in"){
                nav('/signin')
            }
        })
    })

    return (
        <form onSubmit={handleSubmit} onChange={handleChange} action="">
            <label htmlFor="date">Date: </label>
            <input id="date" name="date" type="text" />
            <label htmlFor="name">Name: </label>
            <input id="name" name="name" type="text" />
            <label htmlFor="source">Source: </label>
            <input id="source" name="source" type="text" />
            <label htmlFor="location">Location: </label>
            <input id="location" name="location" type="text" />
            <label htmlFor="amount">Amount: </label>
            <input id="amount" name="amount" type="number" />
            <input type="submit" />
        </form>

    )
}

export default NewTransaction