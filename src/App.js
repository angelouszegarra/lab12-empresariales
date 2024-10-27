// src/App.js

import React from 'react';
import './App.css';
import CharacterLoader from './CharacterLoader';
import SearchBar from './SearchBar';

function App() {
    return (
        <div className="App">
            <h1>Personajes de Star Wars</h1>
            <SearchBar />
            <CharacterLoader />
        </div>
    );
}

export default App;