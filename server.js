const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return;
    }

    const envFile = fs.readFileSync(filePath, 'utf8');

    envFile.split(/\r?\n/).forEach((line) => {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith('#')) {
            return;
        }

        const equalsIndex = trimmedLine.indexOf('=');

        if (equalsIndex === -1) {
            return;
        }

        const key = trimmedLine.slice(0, equalsIndex).trim();
        const value = trimmedLine.slice(equalsIndex + 1).trim();

        if (key && !process.env[key]) {
            process.env[key] = value;
        }
    });
}

loadEnvFile(path.join(__dirname, '.env'));

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

app.use(express.static(path.join(__dirname)));

app.get('/api/movies', async (req, res) => {
    if (!RAPIDAPI_KEY) {
        return res.status(500).json({ error: 'RAPIDAPI_KEY is not configured' });
    }

    try {
        const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch movies' });
        }

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/watchlist', (req, res) => {
    res.sendFile(path.join(__dirname, 'watchlist.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:3000`);
});