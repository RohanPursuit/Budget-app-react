import Transactions from "../components/Transactions";

function ShowAll({setTotal}) {
    console.log("ShowAll")
    return (
      <div>
          <h2>Show All</h2>
        <Transactions setTotal={setTotal}/>
      </div>
    );
  }
  
  export default ShowAll;