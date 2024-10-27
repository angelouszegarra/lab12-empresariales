// src/SearchBar.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value) {
            fetchData(value);
        } else {
            setResults([]);
        }
    };

    const fetchData = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
            const sortedResults = response.data.results.sort((a, b) => a.name.localeCompare(b.name));
            setResults(sortedResults);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <TextField
                label="Buscar personajes..."
                variant="outlined"
                fullWidth
                value={query}
                onChange={handleChange}
                style={{ marginBottom: '20px' }}
            />
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {results.map((character, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={character.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
}

export default SearchBar;