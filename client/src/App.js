import React from 'react';
import Auth from './Auth';

import './App.css';
import Router from './Router';
import Header from './components/Header';
import Public from './components/Public';
import Protected from './components/Protected';
import Footer from './components/Footer';

// import { Container } from 'react-bootstrap';

const UserContext = React.createContext('not logged in');

class App extends React.Component {
  
  state = {
    loggedIn: false,
    userId: ''
  };

  setUserId = (newVal) => {
    const isLoggedIn = (newVal !== '')
    this.setState({userId: newVal});
    this.setState({loggedIn: isLoggedIn});
  }

  render () {
    console.log ("RENDERING App. State: ", this.state)
    console.log("auth: ",Auth.getAuth())
    return (
    <div className="App">
      <div>
        <Header 
          userState={this.state}
          setUserId={this.setUserId}
          />
      </div>
      <div className="main">
        <Router 
          userId={this.state.userId} 
          setUserId={this.setUserId}
          />
        {Auth.getAuth() 
        ? <Protected userId={this.state.userId} />
        : <Public setUserId={this.setUserId}/>}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
    )
  };
}

export default App;
