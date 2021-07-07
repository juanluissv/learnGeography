import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Country from './components/Country'
import Activity from './components/Activity'
import Header from './components/Header'


function App() {
  return (
    <Router>
        <div className="container">
          <Route path='/' component={Header}  />
          <Route path='/' component={Landing} exact />
          <Route path='/home' component={Home} />
          <Route path='/country/:id' component={Country} exact/>
          <Route path='/activity' component={Activity} />
        </div>
  </Router>
  );
}

export default App;
