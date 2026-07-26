let result = [];

const moviesPromise = fetch('/api/movies')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    result = data.map((movie, index) => ({ ...movie, id: index}));
  })
  .catch(function(error) {
    console.error(error);
  });

  // let likedMovies = []
  let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];

async function searchMovies() {
    await moviesPromise;
    var input, filter;
    input = document.getElementById('search-input');
    filter = input.value.toUpperCase();
    // Get a reference to the container where to append the image
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
          
          // Add heart button
          var heartButton = document.createElement("button");
          heartButton.classList.add("heart-button");
          heartButton.innerHTML = "&#9829;";
          heartButton.onclick = function(event) {
            event.stopPropagation();
            heartButton.classList.toggle("active");
            if (heartButton.classList.contains("active")) {
              if (!likedMovies.some(m => m.id === movie.id)) {
                likedMovies.push(movie);
              }
            } else {
              likedMovies = likedMovies.filter(m => m !== movie);
            }
            localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
          };
          
          movieElement.appendChild(heartButton);
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

async function showAll() {
  await moviesPromise;
  var container = document.getElementById("movie-container");
  container.innerHTML = '';
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

    // Add heart button
    var heartButton = document.createElement("button");
    heartButton.classList.add("heart-button");
    heartButton.innerHTML = "&#9829;";
    heartButton.onclick = function(event) {
      event.stopPropagation();
      heartButton.classList.toggle("active");
      if (heartButton.classList.contains("active")) {
        if (!likedMovies.some(m => m.id === movie.id)) {
          likedMovies.push(movie);
        }
      } else {
        likedMovies = likedMovies.filter(m => m !== movie);
        //checks the heart buttons activity of every movie in our liked movies array 
      }
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
      //update the local storage
    };

    movieElement.appendChild(heartButton);
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