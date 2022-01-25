import Transactions from "../components/Transactions";

function ShowAll({setTotal}) {
    return (
      <div>
          <h2>Show All</h2>
        <Transactions setTotal={setTotal}/>
      </div>
    );
  }
  
  export default ShowAll;