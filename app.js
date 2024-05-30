const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

document.addEventListener("DOMContentLoaded", () => {
  fetchRandomMovies();
  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      console.log(event.target.value);
      const searchQuery = document.getElementById("search-box").value;
      searchMovies(searchQuery);
    });
});

async function fetchRandomMovies() {
  try {
    fetch(
      `${BASE_URL}/movie/popular?include_adult=false?language=es-ES&page=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        displayMovies(data.results.slice(0, 5), "random-movies-list");
      });
  } catch (error) {
    console.error("Error fetching random movies:", error);
  }
}

function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  console.log(movies);
  movies &&
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie-item");
      movieElement.innerHTML = `
            <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
        `;
      movieElement.addEventListener("click", () => showMovieDetails(movie));
      container.appendChild(movieElement);
    });
}

async function searchMovies(query) {
  if (query.length < 3) {
    document.getElementById("search-results").innerHTML = "";
    return;
  }
  try {
    fetch(
      `${BASE_URL}/search/movie?include_adult=false&language=es-ES&query=${query}&page=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        displayMovies(data.results.slice(0, 10), "search-results");
        console.log(data);
      });
  } catch (error) {
    console.error("Error searching movies:", error);
  }
}

async function showMovieDetails(movie) {
  const movieDetailElement = document.getElementById("movie-detail");
  movieDetailElement.innerHTML = `
            <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p><strong>Rating:</strong> ${movie.vote_average}</p>
            <p>${movie.overview}</p>
        `;
  document.getElementById("movie-details").classList.remove("hidden");
  document.getElementById("movies-list").classList.add("hidden");
}

function goBack() {
  document.getElementById("movies-list").classList.remove("hidden");
  document.getElementById("movie-details").classList.add("hidden");
}
