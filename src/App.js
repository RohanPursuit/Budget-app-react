import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useState, useEffect } from 'react';

const URL = process.env.REACT_APP_URL

function App() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {     
    axios
    .get(`${URL}/budget`)
    .then((response) => {       
      setTransactions(response.data);       
      console.log(response.data, URL);     
    });
  }, [])
  return (
    <div className="App">
      {transactions.map(el=> el.source)}
    </div>
  );
}

export default App;
