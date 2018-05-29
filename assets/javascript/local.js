$(document).ready(function() {

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


//========================================================================================================================
// MAIN CODE
//========================================================================================================================

    var queryLocal = 'https://api.seatgeek.com/2/events?geoip=true&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'
    $.ajax({
        url: queryLocal,
        method: 'GET'
    }).then(function(responseLocal) {
        console.log(responseLocal);
        
    for (i = 0; i < responseLocal.length; i++) {
        
        var title = responseLocal.events[i].title;
        var venueInfo = responseLocal.events[i].venue.name;
        var venueTime = responseLocal.events[i].datetime_local;
        venueTime = moment(venueTime).format('LLLL');
        console.log(title);
        console.log(vneueInfo);
        console.log(venueTime);
        
        if (i == 0) {
            // $('.collapsible').append($('<li>', {id: 'result0'}));
            $('#headerResult0').append('test');
            // $('.collapsible-header').append($('<i class="material-icons">local_activity</i>'));
            $('#bodyResult0').append('TEST');
            
        }
    }
    })
})