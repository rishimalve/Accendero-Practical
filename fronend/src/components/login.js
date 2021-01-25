import axios from "axios";
import React, { useState } from "react";
import "../primitive.css";

const Login = props => {

  const initialState = {
    username: '',
    password: ''
  }

  const [user, setUser] = useState(initialState)

  const handleChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const submitForm = (event) => {
    console.log(user);
    event.preventDefault();

    axios.post("http://localhost:5000/api/login", user).then(res => {
      console.log(res);
    });
  }

  return (
    <div className="small-container ">
      <form onSubmit={submitForm}>
        <label>Username</label>
        <input type="text" name="username" id="uername" value={user.username} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" id="password" value={user.password} onChange={handleChange} required /><br />
        <button type="Login" className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
