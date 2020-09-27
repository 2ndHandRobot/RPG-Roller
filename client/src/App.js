import React from 'react';
import Auth from './Auth';

import './App.css';
import Router from './Router';
import Header from './components/Header';
import Footer from './components/Footer';
import Public from './components/Public';
import Protected from './components/Protected';

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
      {/* <div> */}
        <Header 
          userState={this.state}
          setUserId={this.setUserId}
          />
      {/* </div> */}
      <div>
        <Router 
          userId={this.state.userId} 
          setUserId={this.setUserId}
          />
        {Auth.getAuth() 
        ? <Protected userId={this.state.userId} />
        : <Public setUserId={this.setUserId}/>}
      </div>
      {/* <div> */}
        <Footer />
      {/* </div> */}
    </div>
    )
  };
}

export default App;
