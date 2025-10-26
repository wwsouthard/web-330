"use strict";
/*    JavaScript 7th Edition
     Chapter 8
     Project 08-01

     Project to create a timer object
     Author: Will Southard
     Date: 10/26/25

     Filename: project08-01.js
*/

/*--------------- Object Code --------------------*/

// Create timer constructor function
function timer(min, sec) {
     this.minutes = min;
     this.seconds = sec;
     this.timeID = null;
}

// Add runPause method to timer prototype
timer.prototype.runPause = function(timer, minBox, secBox) {
     if (timer.timeID) {
          // Timer is running - pause it
          window.clearInterval(timer.timeID);
          timer.timeID = null;
     } else {
          // Timer is paused - start it
          timer.timeID = window.setInterval(function() {
               countdown();
          }, 1000);
     }
};

// Countdown function
function countdown() {
     if (myTimer.seconds > 0) {
          // Decrease seconds by 1
          myTimer.seconds--;
     } else if (myTimer.minutes > 0) {
          // Decrease minutes by 1 and set seconds to 59
          myTimer.minutes--;
          myTimer.seconds = 59;
     } else {
          // Timer has reached 0:0 - stop the timer
          window.clearInterval(myTimer.timeID);
          myTimer.timeID = null;
     }
     // Write timer values to the input boxes
     minBox.value = myTimer.minutes;
     secBox.value = myTimer.seconds;
}

/*---------------Interface Code -----------------*/

/* Interface Objects */
let minBox = document.getElementById("minutesBox");
let secBox = document.getElementById("secondsBox");
let runPauseTimer = document.getElementById("runPauseButton");

// Declare instance of timer object
let myTimer = new timer(minBox.value, secBox.value);

// Create onchange event handlers
minBox.onchange = function() {
     myTimer.minutes = minBox.value;
};

secBox.onchange = function() {
     myTimer.seconds = secBox.value;
};

// Create onclick event handler for runPauseTimer button
runPauseTimer.onclick = function() {
     myTimer.runPause(myTimer, minBox, secBox);
};