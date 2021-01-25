import './primitive.css'
import Nvgbar from './nav-bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router'
import Reg from './components/reg';

function App() {
  return (
    <div className="App">
      <Nvgbar />
      <Router>
        <Reg path="reg" />
      </Router>
    </div>
  );
}

export default App;
