import React, { Component } from 'react';
import CharacterList from './modules/CharacterList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Alinta energy code test</h1>
        </header>
        <CharacterList />
      </div>
    );
  }
}

export default App;
