/*
  Pragmatic JavaScript
  Chapter 2
  Programming Assignment

  Author: Will Southard
  Date: November 20, 2025
  Filename: script.js
*/

// In-memory array of table objects
let tables = [
  {
    tableNumber: 1,
    capacity: 4,
    isReserved: false
  },
  {
    tableNumber: 2,
    capacity: 4,
    isReserved: false
  },
  {
    tableNumber: 3,
    capacity: 6,
    isReserved: false
  },
  {
    tableNumber: 4,
    capacity: 2,
    isReserved: false
  },
  {
    tableNumber: 5,
    capacity: 8,
    isReserved: false
  }
];

/**
 * Reserves a table using a callback function
 * @param {number} tableNumber - The table number to reserve
 * @param {Function} callback - The callback function to execute after reservation attempt
 * @param {number} timeInMs - The delay in milliseconds before executing the callback
 */
function reserveTable(tableNumber, callback, timeInMs) {
  // Find the table matching the tableNumber
  const table = tables.find(t => t.tableNumber === tableNumber);
  
  // Check if table exists
  if (!table) {
    callback("Error: Table not found.");
    return;
  }
  
  // If table is already reserved, immediately call callback with error message
  if (table.isReserved === true) {
    callback("Error: Table " + tableNumber + " is already reserved. Please select another table.");
    return;
  }
  
  // If table is available, reserve it and use setTimeout to simulate delay
  if (table.isReserved === false) {
    table.isReserved = true;
    
    // Use setTimeout to simulate delay, then call callback with success message
    setTimeout(function() {
      callback("Success! Table " + tableNumber + " has been reserved.");
    }, timeInMs);
  }
}

// Form submission event listener
document.getElementById("reservationForm").addEventListener("submit", function(e) {
  // Prevent default form submission behavior
  e.preventDefault();
  
  // Get form elements
  const nameInput = document.getElementById("name");
  const tableSelect = document.getElementById("tableNumber");
  const messageDiv = document.getElementById("message");
  
  // Get user's name and selected table number
  const name = nameInput.value.trim();
  const tableNumber = parseInt(tableSelect.value);
  
  // Validate that name is entered
  if (!name) {
    messageDiv.textContent = "Error: Please enter your name.";
    messageDiv.className = "error";
    return;
  }
  
  // Validate that table number is selected
  if (!tableNumber || isNaN(tableNumber)) {
    messageDiv.textContent = "Error: Please select a table number.";
    messageDiv.className = "error";
    return;
  }
  
  // Clear previous message
  messageDiv.textContent = "Processing your reservation...";
  messageDiv.className = "";
  
  // Call reserveTable with callback function and delay
  reserveTable(tableNumber, function(message) {
    // Update message area with the result
    messageDiv.textContent = message;
    
    // Apply styling based on success or error
    if (message.startsWith("Success")) {
      messageDiv.className = "success";
      // Reset form on success
      nameInput.value = "";
      tableSelect.value = "";
    } else {
      messageDiv.className = "error";
    }
  }, 2000); // 2000ms (2 second) delay
});
