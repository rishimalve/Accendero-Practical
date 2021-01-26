import './primitive.css'
import Nvgbar from './nav-bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router'
import Reg from './components/reg';
import Login from './components/login';
import LandingPage from './components/landingPage';
import MoodCheck from './components/moodCheck';
import React, { useState } from "react";
// import AuthContext from './components/context';

function App() {

  const initialstate = {
    isLoggedIn: false,
    id: null
  }

  const [userState, setUserState] = useState(initialstate);

  return (
    <div className="App">
      {/* <AuthContext.Provider value={[state, setContext]}> */}
      <Nvgbar />
      <div>
        <Router>
          <Reg path="registration" userState={userState} />
          <Login path="login" setUserState={val => setUserState(val)} userState={userState} />
          <LandingPage path="/" />
          <MoodCheck path="/moodCheck" userState={userState} />
        </Router>
      </div>
      {/* </AuthContext.Provider> */}
    </div>
  );
}

export default App;
