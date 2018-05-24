//DOCUMENT READY
$(document).ready(function(){

//========================================================================================================================
// jQuery for Materialize Design Elements
//========================================================================================================================
    // Initializes all of the Materialize Components with a single function call 
    M.AutoInit();   








//========================================================================================================================
// VARIABLES
//========================================================================================================================









//========================================================================================================================
// FUNCTIONS
//========================================================================================================================







});

var queryURL = 'https://api.seatgeek.com/2/events?client_id=MTE2OTU5MjJ8MTUyNzEyNjc0Ny43OQ'
// var queryURL2 = 'https://api.seatgeek.com/2/events/739515?callback=' + search;
    $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) { 
        var result = response.data;
        console.log(result);
        
        });