"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-02

      Project to read field values from session storage
      Author: Will Southard
      Date: November 10, 2025

      Filename: project09-02b.js
*/
// Read sessionStorage and populate the summary table
document.addEventListener("DOMContentLoaded", () => {
  const keys = [
    "riderName",
    "ageGroup",
    "bikeOption",
    "routeOption",
    "accOption",
    "region",
    "miles",
    "comments"
  ];

  keys.forEach(key => {
    const el = document.getElementById(key);
    if (el) el.textContent = sessionStorage.getItem(key) || "";
  });
});

/* Page Objects */

let riderName = document.getElementById("riderName");
let ageGroup = document.getElementById("ageGroup");
let bikeOption = document.getElementById("bikeOption");
let routeOption = document.getElementById("routeOption");
let accOption = document.getElementById("accOption");
let region = document.getElementById("region");
let miles = document.getElementById("miles");
let comments = document.getElementById("comments");