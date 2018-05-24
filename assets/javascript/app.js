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

var title = '';







//========================================================================================================================
// FUNCTIONS
//========================================================================================================================
$(document).ready(function() {
function splitWord(x){
    x = title.split('-', 1);
    
    return x;
}







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
        for (let i = 0; i < 2; i++){
            title = result.events[i].title;
            console.log(title);
            splitWord(i);
            // $('#event').text(splitWord);
        }
        
        
        });

    });//end of document check