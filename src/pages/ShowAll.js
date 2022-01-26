import Transactions from "../components/Transactions";
import "../styles/ShowAll.css"

function ShowAll({setTotal}) {
    return (
      <div className="showall">
          <h2>Show All</h2>
        <Transactions setTotal={setTotal}/>
      </div>
    );
  }
  
  export default ShowAll;