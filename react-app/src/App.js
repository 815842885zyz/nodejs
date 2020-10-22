import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import { Spin } from 'antd';
import ReactDOM from 'react-dom';

function App() {
/*  function tick() {
    const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
    );
    // highlight-next-line
    ReactDOM.render(element, document.getElementById('root'));
  }*/

  // setInterval(tick, 1000);
  return (
    <div className="App">
      <React.Fragment>
        <Spin />
      </React.Fragment>
    <Button type="primary">Primary</Button>
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          {/*Edit <code>src/App.js</code> and save to reload.*/}
        </p>

      </header>
    </div>
  );
}


export default App;
