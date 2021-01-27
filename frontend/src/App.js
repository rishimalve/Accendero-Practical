import './primitive.css'
import Nvgbar from './nav-bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router'
import Reg from './components/reg';
import Login from './components/login';
import LandingPage from './components/landingPage';
import MoodCheck from './components/moodCheck';
import React, { useState } from "react";
import History from './components/history';

function App() {

  const initialstate = {
    isLoggedIn: false,
    id: null
  }

  const [userState, setUserState] = useState(initialstate);

  return (
    <div className="App">
      <Nvgbar userState={userState}/>
      <div>
        <Router>
          <Login path="login" setUserState={val => setUserState(val)} userState={userState} />
          <Reg path="registration" userState={userState} />
          <LandingPage path="/" setUserState={val => setUserState(val)} userState={userState}/>
          <MoodCheck path="/moodCheck" userState={userState} />
          <History path="/history" userState={userState}></History>
        </Router>
      </div>
    </div>
  );
}

export default App;
