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

var queryURL = 'https://api.seatgeek.com/2/events?client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw&client_secret=f3eac0382f03fe214aa73f1b37685e3747dfd3aaa34d43fd553af4ab043b602a'
// var queryURL2 = 'https://api.seatgeek.com/2/events/739515?callback=' + search;
// 'https://api.seatgeek.com/2/events?venue.state=' + search
    $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) { 
        var result = response;
        console.log(result);
        // for (let i = 0; i < 3; i++){
            //start title
            var title = result.events[0].title;
            console.log(title);
            splitWord(i);
            // $('#event').text(splitWord);
        }
            $('#title').text(title);
            var split = title.split('-', 1);
            $('#event').text(split);
            //start url
            var link = result.events[0].url;
            console.log(link);
            $('#link').attr('href', link);
            //start img
            var img = result.events[0].performers[0].image;
            console.log(img);
            $('#img').attr('src', img);
            //venue info/stats
            var venueInfo = result.events[0].venue.name;
            var venueAddy = result.events[0].venue.address;
            console.log(venueInfo);
            
            var br = $('<br>');
            $('#eventInfo').append('Venue: ' + venueInfo);
            $('#eventInfo').append(br);
            $('#eventInfo').append('Address: ' + venueAddy);
        // }
        
        
        });