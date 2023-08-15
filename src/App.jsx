import React from 'react';
import './App.css';
import MainPanel from './components/MainPanel';
import UserLogin from './components/UserLogin';


function App() {
  return (
    <div className='app'>
      <div className='mainSection'>
        <MainPanel /></div>
      <div className='cityPanel'>
        <UserLogin />
      </div>

    </div>
  )
}

export default App


