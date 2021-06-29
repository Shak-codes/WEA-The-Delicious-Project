import React, { useState } from 'react';

function Login() {

    // Variable for getting username
    const [username, setUsername] = useState('');

    // Function for setting username variable to input text
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    // Variable to set localstorage value to current username
    const handleLogin = () => {
        localStorage.setItem('username', username);
        console.log(localStorage.username);
    }

    // Test function for debugging if needed
    const showUsername = () => {
        console.log(localStorage.username);
    }

    // Return login component
    return (
        <div className="login">
            <input className="login-input" type="text" onChange={handleChangeUsername} maxLength="10"></input><br/>
            <button className="login-button" onClick={handleLogin}>Login!</button>
        </div>
    )
}

export default Login;