/*
  Pragmatic JavaScript
  Chapter 3
  Programming Assignment

  Author: Will Southard
  Date: December 07, 2025
  Filename: app.js
*/

"use strict";

// Array of chef objects containing chef information
// Each chef has: name, specialty, weakness, and restaurantLocation
const chefs = [
  {
    name: "Chef Aiko",
    specialty: "Sushi",
    weakness: "Impatient with plating",
    restaurantLocation: "Tokyo, Japan"
  },
  {
    name: "Chef Marco",
    specialty: "Italian Cuisine",
    weakness: "Tends to oversalt dishes",
    restaurantLocation: "Florence, Italy"
  },
  {
    name: "Chef Sofia",
    specialty: "French Pastries",
    weakness: "Struggles with time management",
    restaurantLocation: "Paris, France"
  }
];

/**
 * Retrieves Chef 1's information
 * Returns a Promise that resolves with the chef data after a 2 second delay
 * @returns {Promise} Promise that resolves with chef object or rejects with error
 */
function getChefOne() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Chef 1 always succeeds
      resolve(chefs[0]);
    }, 2000);
  });
}

/**
 * Retrieves Chef 2's information
 * Returns a Promise that resolves with the chef data after a 3 second delay
 * Has a 30% chance of rejecting to demonstrate error handling
 * @returns {Promise} Promise that resolves with chef object or rejects with error
 */
function getChefTwo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Chef 2 has a chance to fail (30% rejection rate)
      if (Math.random() < 0.3) {
        reject(new Error("Failed to fetch Chef 2 data: Network timeout"));
      } else {
        resolve(chefs[1]);
      }
    }, 3000);
  });
}

/**
 * Retrieves Chef 3's information
 * Returns a Promise that resolves with the chef data after a 4 second delay
 * @returns {Promise} Promise that resolves with chef object or rejects with error
 */
function getChefThree() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Chef 3 always succeeds
      resolve(chefs[2]);
    }, 4000);
  });
}

/**
 * Updates the DOM with chef information
 * @param {number} index - The index of the chef (0, 1, or 2)
 * @param {Object} chef - The chef object with name, specialty, weakness, restaurantLocation
 */
function displayChefData(index, chef) {
  const chefCard = document.getElementById(`chef${index + 1}`);
  const contentDiv = chefCard.querySelector('.chef-content');
  
  contentDiv.innerHTML = `
    <div class="chef-data">
      <div class="data-field">
        <span class="data-label">Name:</span>
        <span class="data-value">${chef.name}</span>
      </div>
      <div class="data-field">
        <span class="data-label">Specialty:</span>
        <span class="data-value">${chef.specialty}</span>
      </div>
      <div class="data-field">
        <span class="data-label">Weakness:</span>
        <span class="data-value">${chef.weakness}</span>
      </div>
      <div class="data-field">
        <span class="data-label">Restaurant Location:</span>
        <span class="data-value">${chef.restaurantLocation}</span>
      </div>
    </div>
  `;
}

/**
 * Displays an error message in the chef card
 * @param {number} index - The index of the chef (0, 1, or 2)
 * @param {string} errorMessage - The error message to display
 */
function displayError(index, errorMessage) {
  const chefCard = document.getElementById(`chef${index + 1}`);
  const contentDiv = chefCard.querySelector('.chef-content');
  
  contentDiv.innerHTML = `
    <div class="error-message">
      Error loading Chef ${index + 1}: ${errorMessage}
    </div>
  `;
}

/**
 * Initializes the dashboard by fetching all chef data using Promise.allSettled
 * Promise.allSettled is used instead of Promise.all because we want to handle
 * both fulfilled and rejected promises gracefully, showing data for successful
 * fetches and error messages for failed ones, rather than failing entirely
 * if any single promise rejects.
 */
function initDashboard() {
  // Use Promise.allSettled to wait for all promises to settle (fulfilled or rejected)
  // This allows us to handle both success and failure cases independently
  Promise.allSettled([getChefOne(), getChefTwo(), getChefThree()])
    .then((results) => {
      // Iterate over the results array
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          // If the promise was fulfilled, display the chef data
          displayChefData(index, result.value);
        } else {
          // If the promise was rejected, display an error message
          const errorMessage = result.reason?.message || result.reason || "Unknown error occurred";
          displayError(index, errorMessage);
        }
      });
    })
    .catch((error) => {
      // This catch block should rarely execute with Promise.allSettled,
      // but it's good practice to have error handling
      console.error("Unexpected error:", error);
    });
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', initDashboard);
