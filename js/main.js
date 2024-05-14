var result;
const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbfe63a4e9msh7ac13de51212066p142673jsn536230286bc4',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

fetch(url, options)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    result = data;
    console.log(result);
  })
  .catch(function(error) {
    console.error(error);
  });



function searchMovies() {
    var input, filter;
    input = document.getElementById('search-input');
    filter = input.value.toUpperCase();
    // Get a reference to the container where you want to append the image
    var container = document.getElementById("movie-container");
    // Clear previous content in the container
    container.innerHTML = '';
    var moviesFound = false;
    if(filter != ''){
      result.forEach((movie, index) => {
        if (movie.title.toUpperCase().includes(filter)) {
          // Create a div element for the movie with the movie-element class
          var movieElement = document.createElement("div");
          movieElement.classList.add("movie-element"); // Add the movie-element class

          // Create an anchor element for the movie
          var movieLink = document.createElement("a");
          movieLink.href = movie.imdb_link; // Set the href to the movie's IMDb link
          movieLink.target = "_blank"; // Open link in a new tab
          movieElement.appendChild(movieLink); // Append the anchor element to the movie element

          // Create an image element for the movie
          var imgElement = document.createElement("img");
          imgElement.src = movie.image;
          imgElement.alt = movie.title;
          // Append the image element to the anchor element
          movieLink.appendChild(imgElement);

          // Append the movie element to the container
          container.appendChild(movieElement);
          moviesFound = true;

          // Add spacing element between movie elements, except for the last one
          if (index !== result.length - 1) {
            var spacingElement = document.createElement("div");
            spacingElement.classList.add("movie-spacing");
            container.appendChild(spacingElement);
        }
      }
      });
    }
     // If no movies are found, display a message
     if (!moviesFound) {
      var notFoundText = document.createElement("p");
      notFoundText.classList.add("not-found");
      notFoundText.textContent = "No movies found that fit the description.";
      container.appendChild(notFoundText);
  }
    //clear input field
    input.value = "";
}

function showAll() {
  var container = document.getElementById("movie-container");
  result.forEach((movie, index) => {
    // Create a div element for the movie with the movie-element class
    var movieElement = document.createElement("div");
    movieElement.classList.add("movie-element"); // Add the movie-element class

    // Create an anchor element for the movie
    var movieLink = document.createElement("a");
    movieLink.href = movie.imdb_link; // Set the href to the movie's IMDb link
    movieLink.target = "_blank"; // Open link in a new tab
    movieElement.appendChild(movieLink); // Append the anchor element to the movie element

    // Create an image element for the movie
    var imgElement = document.createElement("img");
    imgElement.src = movie.image;
    imgElement.alt = movie.title;
    // Append the image element to the anchor element
    movieLink.appendChild(imgElement);

    // Append the movie element to the container
    container.appendChild(movieElement);
    moviesFound = true;
    // Add spacing element between movie elements, except for the last one
    if (index !== result.length - 1) {
      var spacingElement = document.createElement("div");
      spacingElement.classList.add("movie-spacing");
      container.appendChild(spacingElement);
  }
  });
}
