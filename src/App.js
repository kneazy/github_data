import React, { Component } from 'react';
import './App.css';
import UserInfo from './UserInfo';


class App extends Component {
  
  render() {
    const userName = ['IrinaGutu', 'kneazy', 'anrw', 'nataliacr'];
    const userData = userName.map((item, i)=>{
        return <UserInfo key={i} userName={item}/>
      })
    return userData
  }
}

export default App;
