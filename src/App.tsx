import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LiveWriting from './components/LiveWriting';
import Home from './components/Home';
import Searchbox from './components/Searchbox';
import SweetKittens from './components/SweetKittens';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="flex gap-[10px] ml-[10px] mt-[10px]">
            <li>
              <Link to="/livewriting">LiveWriting</Link>
            </li>
            <li>
              <Link to="/searchbox">SearchBox</Link>
            </li>
            <li>
              <Link to="/sweetkittens">Sweet kittens</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/livewriting" Component={LiveWriting} />
          <Route path="/searchbox" Component={Searchbox} />
          <Route path="/sweetkittens" Component={SweetKittens} />
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
