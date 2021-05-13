import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

import AuthState from './context/Auth/AuthState';
import AlertState from './context/Alert/AlertState';
import ContactState from './context/contacts/ContactState';

import setAuthToken from './utils/setAuthToken'

import './App.css';


if(localStorage.token){
  setAuthToken(localStorage.token)
}


function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
            <Router>
                <div className="App">
                <Navbar />
                  <div className="container">
                    <Alert />
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path ='/about' component={About} /> 
                    <Route exact path ='/register' component={Register} /> 
                    <Route exact path ='/login' component={Login} /> 
                  </Switch>
                </div>
                </div>
            </Router>
          </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
