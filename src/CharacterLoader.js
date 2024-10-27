// src/CharacterLoader.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

function CharacterLoader() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCharacters = () => {
        setLoading(true);
        
        axios.get('https://swapi.dev/api/people/')
            .then((response) => {
                setCharacters(response.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <Container>
            <Button variant="contained" color="primary" onClick={loadCharacters} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Cargar Personajes'}
            </Button>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
    {characters.map((character, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">{character.name}</Typography>
                        <Typography color="textSecondary">
                            <strong>Género:</strong> {character.gender}<br />
                            <strong>Año de nacimiento:</strong> {character.birth_year}
                        </Typography>
                    </CardContent>
                </Card>
            </motion.div>
        </Grid>
    ))}
</Grid>
        </Container>
    );
}

export default CharacterLoader;