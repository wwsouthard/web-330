/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment

  Author: Will Southard
  Date: 11/2/25
  Filename: script.js
*/

"use strict";

function createCharacter(name, gender, characterClass) {
  // Using closures to keep character data private
  return {
    getName: function() {
      return name;
    },
    getGender: function() {
      return gender;
    },
    getClass: function() {
      return characterClass;
    }
  };
}

document.getElementById("generateHero").addEventListener("click", function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("heroName").value.trim();
  const gender = document.getElementById("heroGender").value;
  const characterClass = document.getElementById("heroClass").value;

  // Validate form inputs
  if (!name || !gender || !characterClass) {
    alert("Please fill in all fields!");
    return;
  }

  // Create character using closure
  const character = createCharacter(name, gender, characterClass);

  // Display character information
  const outputDiv = document.getElementById("characterOutput");
  outputDiv.innerHTML = `
    <div class="character-display">
      <h2>Character Created!</h2>
      <div class="character-info">
        <p><strong>Name:</strong> <span class="character-name">${character.getName()}</span></p>
        <p><strong>Gender:</strong> <span class="character-gender">${character.getGender()}</span></p>
        <p><strong>Class:</strong> <span class="character-class">${character.getClass()}</span></p>
      </div>
    </div>
  `;

  // Reset form
  document.getElementById("characterForm").reset();
});