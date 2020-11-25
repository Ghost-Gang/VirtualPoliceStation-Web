import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import firebase from "firebase/app";
// import 'firebase/auth';
import "firebase/auth";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import React from 'react'

import { ToastProvider } from 'react-toast-notifications'

import Index from './components/Index'
import Home from './components/Home'
import NewComplaint from './components/NewComplaint'
import VpsChat from './components/VpsChat'
import ComplaintStatus from './components/ComplaintStatus'
import SignUp from './components/Signup'
import SignIn from './components/Login'
import Footer from './components/Footer'
import NavBar from './components/NavBar';
import Admin from './components/Admin';
import CharCert from './components/CharCert';
import ApplyNoc from './components/ApplyNoc';


// initialize firebase
const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
}
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const App = (props) => {
  console.log('App.js called');

  return (
    <Router>
      <NavBar />
      <Switch>
        <ToastProvider>
          <Route exact path="/" component={Index} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/u/:uid/home" component={Home} />
          <Route exact path="/u/:uid/new-complaint" component={NewComplaint} />
          <Route exact path="/u/:uid/complaint-status" component={ComplaintStatus} />
          <Route exact path="/u/:uid/apply-noc" component={ApplyNoc} />
          <Route exact path="/u/:uid/vps-chat" component={VpsChat} />
          <Route exact path="/u/:uid/admin" component={Admin} />
          <Route exact path="/u/:uid/character-certificate" component={CharCert} />
        </ToastProvider>
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
      <Footer />
    </Router >
  );
}

export default App;