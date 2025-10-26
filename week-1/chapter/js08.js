"use strict";

/*    JavaScript 7th Edition
     Chapter 8
     Chapter case

     Draw Poker Game using Object Oriented Programming
     Author: Will Southard
     Date: 10/24/25

     Filename:       js08.js
 */

window.addEventListener("load", playDrawPoker);

function playDrawPoker() {
  // Reference buttons and images within the Poker Game page
  let dealButton = document.getElementById("dealB");
  let drawButton = document.getElementById("drawB");
  let standButton = document.getElementById("standB");
  let resetButton = document.getElementById("resetB");
  let statusBox = document.getElementById("status");
  let betSelection = document.getElementById("bet");
  let bankBox = document.getElementById("bank");
  let cardImages = document.querySelectorAll("img.cardImg");

  // Set the initial bank and bet values
  pokerGame.currentBank = 500;
  pokerGame.currentBet = 25;

  // Create a deck of shuffled cards
  let myDeck = new pokerDeck();
  myDeck.shuffle();

  // Create an empty poker hand object
  let myHand = new pokerHand(5);

  // Create an array to track selected cards for discarding
  let selectedCards = [false, false, false, false, false];

  // Display the current bank value
  bankBox.value = pokerGame.currentBank;

  // Add click event listeners to card images for discarding
  for (let i = 0; i < cardImages.length; i++) {
    cardImages[i].addEventListener("click", function() {
      // Flip the card images when clicked (only when draw/stand buttons are enabled)
      if (!drawButton.disabled && !standButton.disabled) {
        if (this.src.includes("cardback.png")) {
          // Show the front of the card (keep this card)
          this.src = myHand.cards[i].cardImage();
          selectedCards[i] = false;
        } else {
          // Show the back of the card (discard this card)
          this.src = "cardback.png";
          selectedCards[i] = true;
        }
      }
    });
  }

  // Change the bet when the selection changes
  betSelection.onchange = function() {
    pokerGame.currentBet = parseInt(this.value);
  }

  dealButton.addEventListener("click", function() {
    if (pokerGame.currentBank >= pokerGame.currentBet) {
      // Reset selected cards
      for (let i = 0; i < selectedCards.length; i++) {
        selectedCards[i] = false;
      }

      // Enable the Draw and Stand buttons after the initial deal
      dealButton.disabled = true;        // Turn off the Deal button
      betSelection.disabled = true;      // Turn off the Bet Selection list
      drawButton.disabled = false;       // Turn on the Draw button
      standButton.disabled = false;      // Turn on the Stand Button
      statusBox.textContent = "";        // Erase any status messages

      // Reduce the bank by the size of the bet
      bankBox.value = pokerGame.placeBet();

      // Get a new deck if there are less than 10 cards left
      if (myDeck.cards.length < 10) {
        myDeck = new pokerDeck();
        myDeck.shuffle();
      }
      // Deal 5 cards from the deck to the hand
      myDeck.dealTo(myHand);
      
      // Display the card images on the table (show face up)
      for (let i = 0; i < cardImages.length; i++) {
        cardImages[i].src = myHand.cards[i].cardImage();
      }
    } else {
      statusBox.textContent = "Insufficient Funds";
    }

  });


  drawButton.addEventListener("click", function() {
    // Get a new deck if there are less than 10 cards left
    if (myDeck.cards.length < 10) {
      myDeck = new pokerDeck();
      myDeck.shuffle();
    }

    // Replace cards that are showing the back (cardback.png)
    for (let i = 0; i < cardImages.length; i++) {
      if (cardImages[i].src.includes("cardback.png")) {
        // Replace the card in the hand and update the image
        myHand.replaceCard(i, myDeck);
        cardImages[i].src = myHand.cards[i].cardImage();
        selectedCards[i] = false;
      }
    }

    // Reset selected cards tracking
    for (let i = 0; i < selectedCards.length; i++) {
      selectedCards[i] = false;
    }

    // Evaluate the hand and determine winnings
    let handResult = handType(myHand);
    let multipliers = {
      "Royal Flush": 250,
      "Straight Flush": 50,
      "Four of a Kind": 25,
      "Full House": 9,
      "Flush": 6,
      "Straight": 4,
      "Three of a Kind": 3,
      "Two Pair": 2,
      "Jacks or Better": 1,
      "No Winner": 0
    };

    let winnings = pokerGame.currentBet * multipliers[handResult];
    pokerGame.currentBank += winnings;
    bankBox.value = pokerGame.currentBank;

    if (winnings > 0) {
      statusBox.textContent = handResult + "! You won $" + winnings;
    } else {
      statusBox.textContent = handResult;
    }

    // Enable the Deal and Bet options
    dealButton.disabled = false;
    betSelection.disabled = false;
    drawButton.disabled = true;
    standButton.disabled = true;
  });


  standButton.addEventListener("click", function() {
    // Evaluate the hand and determine winnings
    let handResult = handType(myHand);
    let multipliers = {
      "Royal Flush": 250,
      "Straight Flush": 50,
      "Four of a Kind": 25,
      "Full House": 9,
      "Flush": 6,
      "Straight": 4,
      "Three of a Kind": 3,
      "Two Pair": 2,
      "Jacks or Better": 1,
      "No Winner": 0
    };

    let winnings = pokerGame.currentBet * multipliers[handResult];
    pokerGame.currentBank += winnings;
    bankBox.value = pokerGame.currentBank;

    if (winnings > 0) {
      statusBox.textContent = handResult + "! You won $" + winnings;
    } else {
      statusBox.textContent = handResult;
    }

    // Enable the Deal and Bet options
    dealButton.disabled = false;
    betSelection.disabled = false;
    drawButton.disabled = true;
    standButton.disabled = true;
  });


  // Reload the current page when the Reset button is clicked
  resetButton.addEventListener("click", function() {
    location.reload();
  });
}
