import React, { Component } from 'react';
import './App.css';

import CharacterList from './modules/CharacterList';

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
