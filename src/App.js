import React, { Component } from "react";
import logo from "./logo.svg";
import nowLogo from "./nowLogo.png";
import datePicker from "./datePicker.png";
import "./App.css";
import SNDatepicker from "./SNDatepicker/SNDatepicker";
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={nowLogo} className="App-logo-still" alt="nowLogo" />

          <img src={logo} className="App-logo" alt="logo" />

          <img
            src={datePicker}
            className="App-logo-still-date"
            alt="datePicker"
            width="20px"
          />

          <h1 className="App-title">Welcome to React Tabable Datepicker</h1>
        </header>
        <SNDatepicker />
      </div>
    );
  }
}

export default App;
