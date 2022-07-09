//import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
