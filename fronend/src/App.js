import './primitive.css'
import Nvgbar from './nav-bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router'
import Reg from './components/reg';
import Login from './components/login';
import LandingPage from './components/landingPage';

function App() {
  return (
    <div className="App">
      <Nvgbar />
      <div>
        <Router>
          <Reg path="registration" />
          <Login path="login" />
          <LandingPage path="/" />
        </Router>
      </div>
    </div>
  );
}

export default App;
