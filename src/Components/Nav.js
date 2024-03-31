import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();


    const logout = () => {
        localStorage.clear();
        navigate('/login');

    }
    return (
        <div>
            <img className="nav-img" alt="logo" src="https://images.creativemarket.com/0.1.0/ps/4688698/1820/1214/m1/fpnw/wm0/onlineshop-01-.jpg?1530474986&s=72e624f3bc8f2fd136e59233a13d2d9d" />

            {auth ? <ul className="navbar">
                <li><Link to="/">E-Dashboard</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/login">Logout ({JSON.parse(auth).name})</Link></li> </ul>


                : <ul  className="navbar navright">

                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }

        </div>
    )
}

export default Nav;