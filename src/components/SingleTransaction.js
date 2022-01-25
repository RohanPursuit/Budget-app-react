import axios from "axios"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

const URL = process.env.REACT_APP_URL

function SingleTransaction({index}) {
    const nav = useNavigate()

    const userKey = document.cookie.split(';')[0].split("=")[1]

    const [transaction, setTransaction] = useState({   
        date: "string",
        name: "string",
        source: "string",
        location: "string",
        amount: "number",      
    })

    const handleDelete = (event) => {
        axios.delete(`${URL}/budget/${index}`, {params: {userKey}})
        .then(() => {
            nav('/budget')
        })
    }
    
    useEffect(()=> {
        axios.get(`${URL}/budget/${index}`, {
            params: {
                userKey  
            }
        })
        .then(response => {
            setTransaction(response.data)
        })
    }, [index, userKey])

    return (
        <div>
            <table>
                <thead></thead>
                <tbody>
                <tr>
                    <td>Date:</td> 
                    <td>{transaction.date}</td>
                </tr>
                <tr>
                    <td>Name:</td> 
                    <td>{transaction.name}</td>
                </tr>
                <tr>
                    <td>Source:</td> 
                    <td>{transaction.source}</td>
                </tr>
                <tr>
                    <td>Location:</td> 
                    <td>{transaction.location}</td>
                </tr>
                <tr>
                    <td>Amount:</td> 
                    <td>{transaction.amount}</td>
                </tr>

                </tbody>
            </table>
            <button onClick={() => nav(`/budget/edit/${index}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default SingleTransaction


