"use strict";
/*    JavaScript 7th Edition
     Chapter 10
     Project 10-01

     Project to create a drag and drop jigsaw puzzle
     Author: Will Southard
     Date: November 16, 2025

     Filename: project10-01.js
*/

// Reference to the puzzle board
let puzzleBoard = document.getElementById("puzzleBoard");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
// Array of integers from 1 to 48
let intList = new Array(48);
// pointerX and pointerY will contain the initial coordinates of the pointerX
// pieceX and pieceY will contain the initial coordinates of a puzzle piece
let pointerX = 0;
let pointerY = 0;
let pieceX = 0;
let pieceY = 0;

// Sort the integers from 1 to 48 in random order
for (let i = 0; i < 48 ; i++) {
  intList[i] = i+1;
}
intList.sort(function() {
  return 0.5 - Math.random();
});

// generate randomly-sorted puzzle pieces
for (let i = 0; i < 48; i++) {
  let piece = document.createElement("img");
  piece.src = "piece" + intList[i] + ".png";
  let rowNum = Math.ceil((i+1)/8);
  let colNum = (i + 1) - (rowNum - 1)*8;
  piece.style.top = (rowNum - 1)*98 + 7 + "px";
  piece.style.left = (colNum - 1)*98 + 7 + "px";
  piece.draggable = false; // override the default draggability of images
  puzzleBoard.appendChild(piece);
}

// Node list representing the puzzle pieces
const pieces = document.querySelectorAll("div#puzzleBoard img");

// Function to handle grabbing a piece
function grabPiece(e) {
  // a. store the pointer's starting coordinates
  pointerX = e.clientX;
  pointerY = e.clientY;
  
  // b. disable default touch actions for this element
  e.target.style.touchAction = "none";
  
  // c. bring this piece to the front using zIndex
  zCounter++;
  e.target.style.zIndex = zCounter;
  
  // d. store the piece's starting position
  pieceX = e.target.offsetLeft;
  pieceY = e.target.offsetTop;
  
  // e. add listeners for moving and dropping this specific piece
  e.target.addEventListener("pointermove", movePiece);
  e.target.addEventListener("pointerup", dropPiece);
}

// Function to handle moving a piece
function movePiece(e) {
  // a. compute distance moved from the original pointer position
  const diffX = e.clientX - pointerX;
  const diffY = e.clientY - pointerY;
  
  // b. update the piece's position by adding the deltas
  e.target.style.left = (pieceX + diffX) + "px";
  e.target.style.top = (pieceY + diffY) + "px";
}

// Function to handle dropping a piece
function dropPiece(e) {
  // a. remove the move listener
  e.target.removeEventListener("pointermove", movePiece);
  
  // b. remove the up listener
  e.target.removeEventListener("pointerup", dropPiece);
}

// Attach pointerdown listeners to all puzzle pieces
for (let piece of pieces) {
  piece.addEventListener("pointerdown", grabPiece);
}

