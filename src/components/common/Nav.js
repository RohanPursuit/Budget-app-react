import {Link, useNavigate} from "react-router-dom"
import "../../styles/Nav.css"

function Nav({total, isLoggedIn}) {
    const nav = useNavigate()

    const handleLogOut = () => {
        document.cookie = "loginCred= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        nav('/signin')
    }

    return (
        <div className="Nav">
            <div className="links">
            <Link className="logo" to="/">
                💸
            </Link>
            <Link className="budget" to="/budget">
                Budget App
            </Link>
            <Link className="new-transaction" to="/budget/new">
                NEW TRANSACTION
            </Link>
            </div>
             {isLoggedIn && <button className="login" onClick={handleLogOut}>
                LogOut
            </button>}
            <div className="account-total">Back Account Total: <span className={total === 0 ? "isZero" : total < 0 ? "isLess" : "isGreater"}>${total.toLocaleString("en-US")}</span></div>
        </div>
    );
}
  
  export default Nav;