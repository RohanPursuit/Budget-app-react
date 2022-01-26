import {useState, useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const URL = process.env.REACT_APP_URL

function EditTransaction({index}) {
    const nav = useNavigate()
    console.log("EditTransaction")
    const userKey = document.cookie.split(';')[0].split("=")[1]
    const [transaction ,setTransaction] = useState({
        date: '',
        name: '',
        source: '',
        location: '',
        amount: 0,
    })

    const handleChange = (event) => {
        if(event.target.name === "amount"){
            setTransaction({...transaction, amount: Number(event.target.value)})
        } else {
            setTransaction({...transaction, [event.target.name]: event.target.value})
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.put(`${URL}/budget/${index}`, {
            userKey, transaction
        })
        .then(response => {
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
        <form onSubmit={handleSubmit} action="">
            <table>
                <thead>

                </thead>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="date">Date: </label>
                        </td>
                        <td>
                            <input 
                            id="date" 
                            name="date" 
                            onChange={handleChange} 
                            value={transaction.date} 
                            type="text" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="name">Name: </label>
                        </td>
                        <td>
                            <input 
                            id="name" 
                            name="name"
                            onChange={handleChange} 
                            value={transaction.name}  
                            type="text" />
                        </td>
                    </tr>

                    <tr>
                        <td> 
                            <label htmlFor="source">Source: </label>
                        </td>
                        <td> 
                            <input 
                            id="source" 
                            name="source"
                            onChange={handleChange} 
                            value={transaction.source}  
                            type="text" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="location">Location: </label>
                        </td> 
                        <td>
                            <input 
                            id="location" 
                            name="location"
                            onChange={handleChange} 
                            value={transaction.location}  
                            type="text" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="amount">Amount: </label>
                        </td>
                        <td>
                            <input 
                            id="amount" 
                            name="amount"
                            onChange={handleChange} 
                            value={transaction.amount}  
                            type="number" />
                        </td>
                    
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <input type="submit" />  
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>

    )
}

export default EditTransaction