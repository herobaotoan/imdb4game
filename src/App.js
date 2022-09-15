import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './Bootstrap.css';

import Game from './components/Game';
import Menu from './components/Menu';
import Login from './components/Login';
import Top from './components/Top';
import About from './components/About';
import Admin from './components/Admin';

function App() {

  return (
    <div class=" text-white" style={{backgroundImage: 'url("https://i.imgur.com/IDIiW9w.png")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh'
    }}>
      <Router>
        <div>      
          <Menu/>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/top">
              <Top />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
