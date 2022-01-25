import axios from "axios"
import { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom"
const URL = process.env.REACT_APP_URL

function Transactions({setTotal}) {
    const nav = useNavigate()
    const userKey = document.cookie.split(';')[0].split("=")[1]
    const [transactions, setTransactions] = useState([])

    const [orderAndFilter, setOrderAndFilter] = useState({
        order: "asc",
        key: "date",
        bool: false
    })

    const handleOrder =(event) => {
        setOrderAndFilter({...orderAndFilter, order: orderAndFilter.order === "asc"? "desc" : "asc", key: event.target.name})
    }

    const handleFilter = (event) => {
      setOrderAndFilter({
            ...orderAndFilter,
            [event.target.name]: event.target.value
      });
    };

    const handleDelete = (event) => {
        axios.delete(`${URL}/budget/${event.target.id}`, {params: {userKey}})
        .then(({data}) => {
            setTransactions(data)
            setTotal(data.reduce((a, b) => {
                a = a.amount + b.amount
                return {amount: a}
            }).amount)
        })
    }
    
  
    useEffect(() => {  
      axios
      .get(`${URL}/budget`, {params: {userKey, ...orderAndFilter}})
      .then(({data}) => {
          if(data.info !== "You need to sign in"){
   
            setTransactions(data);
            setTotal(data.reduce((a, b) => {
                a = a.amount + b.amount
                return {amount: a}
            }).amount)
          } else {
              nav("/signin")
          }     
              
      });
    }, [orderAndFilter])
    return (
        <div>
            <label htmlFor="filter-by">Filter: </label>
            <select onChange={handleFilter} name="filterK" id="filter-by">
                <option value="no filter">----</option>
                <option value="date">Date</option>
                <option value="source">Source</option>
            </select>
            <table className="app">
                <thead>
                    <tr>
                        <th>Date<button name="date" onClick={handleOrder}>↑↓</button></th>
                        <th>Source<button name="source" onClick={handleOrder}>↑↓</button></th>
                        <th>Amount<button name="amount" onClick={handleOrder}>↑↓</button></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((el, i) => 
                    <tr key={i}>
                        <td>{el.date}</td>
                        <td>
                            <Link to={"/budget/show/"+i} >
                                {el.source}
                            </Link>
                        </td>
                        <td>
                            {el.amount}
                        </td>
                        <td>
                            <button id={i} onClick={()=> nav(`/budget/edit/${i}`)}>Edit</button>
                        </td>
                        <td>
                            <button id={i} onClick={handleDelete}>Delete</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
      
    );
  }
  
  export default Transactions;