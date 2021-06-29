import React, { useState } from 'react';

function Login() {

    const [username, setUsername] = useState('');

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleLogin = () => {
        localStorage.setItem('username', username);
        console.log(localStorage.username);
    }

    // Test function for debugging if needed
    const showUsername = () => {
        console.log(localStorage.username);
    }

    return (
        <div className="login">
            <input className="login-input" type="text" onChange={handleChangeUsername} maxLength="10"></input><br/>
            <button className="login-button" onClick={handleLogin}>Login!</button>
        </div>
    )
}

export default Login;