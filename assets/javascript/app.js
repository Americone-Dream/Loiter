//DOCUMENT READY
$(document).ready(function(){

//========================================================================================================================
// jQuery for Materialize Design Elements
//========================================================================================================================
    // Initializes all of the Materialize Components with a single function call 
    M.AutoInit();   

    //for autocomplete search bar
    $('input.autocomplete').autocomplete({
        data: {
          "Los Angeles Galaxy": null,
          "Los Angeles Lakers": null,
          "Los Angeles Clippers": null,
          "Los Angeles Kings": null,
          "Los Angeles Dodgers": null,
          "Los Angeles Angels": null,
          "Google": 'https://placehold.it/250x250'
        },
      });






//========================================================================================================================
// VARIABLES
//========================================================================================================================









//========================================================================================================================
// FUNCTIONS
//========================================================================================================================







});

// var queryURL =
//     $.ajax({
//           url: queryURL,
//           method: "GET"
//         }).then(function(response) { 
//         var result = response.data;
//         console.log(result);