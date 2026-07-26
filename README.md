# MovieNest

MovieNest is a simple web app for browsing the IMDb Top 100 movies, searching by title, and building a personal watchlist by "liking" movies. It's built with a lightweight Node/Express server that proxies requests to the RapidAPI IMDb Top 100 Movies API, plus a vanilla HTML/CSS/JS frontend.

## Features

- Browse the IMDb Top 100 movies with poster images and links to IMDb
- Search movies by title
- Like/unlike movies to add or remove them from your watchlist
- Watchlist is persisted in the browser via `localStorage`
- Simple Express server that serves static files and proxies the movies API (keeping your API key server-side)

## Project structure

```
.
├── server.js          # Express server: serves static files + /api/movies proxy
├── index.html         # Home page (search + browse movies)
├── watchlist.html      # Watchlist page (liked movies)
├── css/
│   └── style.css      # App styling
├── js/
│   ├── main.js         # Home page logic (fetch, search, like/unlike)
│   └── watchlist.js    # Watchlist page logic
└── .env.example        # Example environment file
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended, for native `fetch` support)
- A [RapidAPI](https://rapidapi.com/) account subscribed to the [IMDb Top 100 Movies API](https://rapidapi.com/apidojo/api/imdb-top-100-movies)

## Getting started

1. Clone the repo and move into the project directory:

   ```bash
   git clone <repo-url>
   cd MovieNest
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your environment:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your RapidAPI key:

   ```
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your browser at [http://localhost:3000](http://localhost:3000)

## Available routes

| Route          | Description                                  |
| -------------- | --------------------------------------------- |
| `/`            | Home page — browse and search movies          |
| `/watchlist`   | Your watchlist of liked movies                |
| `/api/movies`  | JSON proxy endpoint for the IMDb Top 100 API  |

## How the watchlist works

Clicking the heart icon on a movie toggles it in your watchlist. Watchlist state is stored in the browser's `localStorage` under the `likedMovies` key, so it's local to your browser and persists across sessions without needing a database.

## Environment variables

| Variable        | Description                                    |
| --------------- | ----------------------------------------------- |
| `RAPIDAPI_KEY`  | Your RapidAPI key for the IMDb Top 100 Movies API |
| `PORT`          | Port the server listens on (default: `3000`)   |

## License

This project currently has no license specified.
