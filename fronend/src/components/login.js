import axios from "axios";
import React, { useState, useEffect } from "react";
import "../primitive.css";
import { navigate } from "@reach/router"
import { Link } from '@reach/router'

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

  useEffect(() => {
    console.log(props.userState)
  },
    [props.userState]
  )

  const submitForm = (event) => {
    console.log(user);
    event.preventDefault();

    axios.post("http://localhost:5000/api/login", user).then(res => {
      console.log(res);
      if (res.status === 201) {
        props.setUserState({ ...props.userState ,isLoggedIn: true, id: res.data['id'] });
        console.log(props.userState)
        navigate(`/moodCheck`);
      }
    });
  }

  return (
    <div className="small-container">
      <form onSubmit={submitForm}>
        <label>Username</label>
        <input type="text" name="username" id="uername" value={user.username} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" id="password" value={user.password} onChange={handleChange} required /><br />
        <button type="submit" className="button">Login</button>&nbsp;&nbsp;&nbsp;
        <Link to="/registration">
          <button type="button" className="button muted-button">New User? Register!</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
