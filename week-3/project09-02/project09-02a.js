"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-02

      Project to read field values from web storage
      Author: Will Southard
      Date: November 10, 2025

      Filename: project09-02a.js
*/
// Save membership form data to sessionStorage and go to the summary page
function showData(e) {
  if (e && typeof e.preventDefault === "function") e.preventDefault();

  const ids = [
    "riderName",
    "ageGroup",
    "bikeOption",
    "routeOption",
    "accOption",
    "region",
    "miles",
    "comments"
  ];

  ids.forEach(id => {
    const el = document.getElementById(id);
    const val = el ? (el.value ?? el.textContent ?? "") : "";
    sessionStorage.setItem(id, String(val));
  });

  // Navigate to results page
  location.href = "project09-02b.html";
}

// Attach handler for either a form submit or a button click
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const submitBtn = document.querySelector("button[type=\"submit\"], input[type=\"submit\"]");

  if (form) form.addEventListener("submit", showData);
  else if (submitBtn) submitBtn.addEventListener("click", showData);
});