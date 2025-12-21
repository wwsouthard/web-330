"use strict";
/*    JavaScript 7th Edition
     Chapter 12
     Project 12-03

     Project to show a recipe with expanding/contracting content
     Author: Will Southard
     Date: December 21, 2025

     Filename: project12-03.js
*/

$("article > h2").click(function(e) {
   // Step 4 variables
   let heading = $(this);
   let list = heading.next();
   let headingImage = heading.children("img");
   
   // Step 5 slideToggle
   list.slideToggle(500);
   
   // Step 6 swap plus/minus icon
   let srcValue = headingImage.attr("src");
   if (srcValue === "plus.png") {
      headingImage.attr("src", "minus.png");
   } else {
      headingImage.attr("src", "plus.png");
   }
});

