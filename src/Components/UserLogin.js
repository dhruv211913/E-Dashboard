import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
       if(auth){
        navigate('/');
       }
    },[])

    const login =async () => {
        console.warn(email, password);

        let result = await fetch('http://localhost:5000/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'Content-Type':'application/json'
        }
        })
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.data))
            localStorage.setItem('token',JSON.stringify(result.auth))

            navigate('/');

        }
    }
    return (

        <div className="login">
            <h1>Login </h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter E-mail" className="inputbox" />
            <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder="Enter password" className="inputbox" />
            <button type="button" onClick={login} className="signupbtn" >Login</button>
        </div>
    )
}


export default UserLogin;