document.addEventListener("DOMContentLoaded", function() {
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    const container = document.getElementById("watchlist-container");

    if (likedMovies.length === 0) {
        const noMoviesMessage = document.createElement("p");
        noMoviesMessage.textContent = "Your watchlist is empty.";
        container.appendChild(noMoviesMessage);
    } else {
        likedMovies.forEach((movie) => {
            // Create a div element for the movie with the movie-element class
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie-element");

            // Create an anchor element for the movie
            const movieLink = document.createElement("a");
            movieLink.href = movie.imdb_link; // Set the href to the movie's IMDb link
            movieLink.target = "_blank"; // Open link in a new tab
            movieElement.appendChild(movieLink); // Append the anchor element to the movie element

            // Create an image element for the movie
            const imgElement = document.createElement("img");
            imgElement.src = movie.image;
            imgElement.alt = movie.title;
            // Append the image element to the anchor element
            movieLink.appendChild(imgElement);

            // Append the movie element to the container
            container.appendChild(movieElement);

            // Add a spacing element between movie elements
            const spacingElement = document.createElement("div");
            spacingElement.classList.add("movie-spacing");
            container.appendChild(spacingElement);
        });
    }
});