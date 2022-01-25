import {Link, useNavigate} from "react-router-dom"

function Nav({total, isLoggedIn}) {
    const nav = useNavigate()
    const handleLogOut = () => {
        document.cookie = "loginCred= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        nav('/signin')
    }

    return (
        <div className="App">
            <Link to="/">
                Home
            </Link>
            <Link to="/budget">
                Budget
            </Link>
            <Link to="/budget/new">
                New Item
            </Link>
             {isLoggedIn && <button onClick={handleLogOut}>
                LogOut
            </button>}
            <div>{total}</div>
        </div>
    );
}
  
  export default Nav;