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

var cardHolder = ['title1', 'title2', 'title3']
// iterate through the different cards via the array to update the jquery selector with the card that we're working on







//========================================================================================================================
// FUNCTIONS
//========================================================================================================================







});

var queryURL = 'https://api.seatgeek.com/2/events?client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw&client_secret=f3eac0382f03fe214aa73f1b37685e3747dfd3aaa34d43fd553af4ab043b602a'
// var queryURL2 = 'https://api.seatgeek.com/2/events/739515?callback=' + search;
// 'https://api.seatgeek.com/2/events?venue.state=' + search
    $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) { 
        var result = response;
        console.log(result);

        // ===============
        // || notice me ||
        // ===============
        // for (i = 0; i < 3; i++){
            // start title
            var eventName = result.events[0].title;
            $('#title').text(eventName);
            var splitName = eventName.split('-', 1);
            $('#event').text(splitName);

            // start url
            var link = result.events[0].url;
            $('#link').attr('href', link);

            // start img
            var eventImg = result.events[0].performers[0].image;
            $('#img').attr('src', eventImg);

            // venue info/stats
            var venueInfo = result.events[0].venue.name;
            var venueAddy = result.events[0].venue.address;
            var venueZip = result.events[0].venue.extended_address;
            $('#eventInfo').append($('<p>', {text:'Venue: ' + venueInfo}));
            $('#eventInfo').append($('<p>', {text:'Address: ' + venueAddy}));
            $('#eventInfo').append($('<p>', {text:venueZip}));
        // }
        
        
        // console.log(response);
        // $()
    });