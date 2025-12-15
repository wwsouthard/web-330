/*
  Pragmatic JavaScript
  Chapter 4
  Programming Assignment

  Author: Will Southard
  Date: December 14, 2025
  Filename: script.js
*/

"use strict";

const movies = [
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    releaseYear: 1994,
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseYear: 1972,
    synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    releaseYear: 2008,
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    releaseYear: 1994,
    synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    releaseYear: 1999,
    synopsis: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
  }
];

function fetchMovie(title) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Find movie by title (case-insensitive)
      const movie = movies.find(
        m => m.title.toLowerCase() === title.toLowerCase().trim()
      );
      
      if (movie) {
        resolve(movie);
      } else {
        reject(new Error(`Movie "${title}" not found in the database.`));
      }
    }, 1000); // 1 second delay to simulate network request
  });
}

async function displayMovie(event) {
  event.preventDefault();
  
  const titleInput = document.getElementById("title-input");
  const movieTitle = document.getElementById("movie-title");
  const movieDirector = document.getElementById("movie-director");
  const movieYear = document.getElementById("movie-year");
  const movieSynopsis = document.getElementById("movie-synopsis");
  const errorMessage = document.getElementById("error-message");
  
  // Clear previous results
  movieTitle.textContent = "";
  movieDirector.textContent = "";
  movieYear.textContent = "";
  movieSynopsis.textContent = "";
  errorMessage.textContent = "";
  errorMessage.className = "";
  
  const searchTitle = titleInput.value;
  
  if (!searchTitle.trim()) {
    errorMessage.textContent = "Please enter a movie title.";
    errorMessage.className = "error";
    return;
  }
  
  try {
    const movie = await fetchMovie(searchTitle);
    
    // Display movie information
    movieTitle.textContent = movie.title;
    movieDirector.textContent = `Director: ${movie.director}`;
    movieYear.textContent = `Release Year: ${movie.releaseYear}`;
    movieSynopsis.textContent = `Synopsis: ${movie.synopsis}`;
    
    // Clear error message if successful
    errorMessage.textContent = "";
    errorMessage.className = "";
  } catch (error) {
    // Display error message
    errorMessage.textContent = error.message;
    errorMessage.className = "error";
    
    // Clear movie information
    movieTitle.textContent = "";
    movieDirector.textContent = "";
    movieYear.textContent = "";
    movieSynopsis.textContent = "";
  }
}

document.getElementById("movie-form").addEventListener("submit", displayMovie);