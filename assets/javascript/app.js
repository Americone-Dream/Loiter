//DOCUMENT READY
$(document).ready(function(){

//========================================================================================================================
// NOTES
//========================================================================================================================

// Parameters for the search bar require event/performer IDs or name labeled as 'slug'

//========================================================================================================================
// jQuery for Materialize Design Elements
//========================================================================================================================
    // Initializes all of the Materialize Components with a single function call 
    M.AutoInit();   

    //for autocomplete search bar
    $('input.autocomplete').autocomplete({
        data: {
          "LA Galaxy": null,
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
function splitString(string, separator) {
    var stringToArray = string.split(separator);
    var joinedString = stringToArray.join('-');
    return joinedString;
}

function searchableString(string, separator) {
    var stringToArray = string.split(separator);
    var joinedString = stringToArray.join('-');
    return joinedString;
}








    // ==================
    // || LANDING PAGE ||
    // ==================

    var queryURL = 'https://api.seatgeek.com/2/events?client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(responsePopular) { 
        console.log(responsePopular);
        var result = responsePopular;
    
    for (let i = 0; i < 3; i++){
        let title = result.events[i].title;
        let split = title.split('-', 1);
        split = title.split('(', 1);
        //start url
        let link = result.events[i].url;           
        //venue info/stats
        let venueInfo = result.events[i].venue.name;
        let venueAddy = result.events[i].venue.address;
        let venueZip = result.events[i].venue.extended_address;
        let avgPrice = result.events[i].stats.average_price;
        let lowPrice = result.events[i].stats.lowest_price;
        let venueTime = result.events[i].datetime_local;
        venueTime = moment(venueTime).format('LLLL');
        console.log(i);

            // ==================
            // || CARD ELEMENT ||
            // ==================

            if (i == 0){
                $('#eventInfo0').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#eventInfo0').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#eventInfo0').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#eventInfo0').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#eventInfo0').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#eventInfo0').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#cardLink0').attr("href", link);
                //moved image due to bugs
                let img = result.events[0].performers[0].image;
                if (img !== null){
                    $('#img0').attr('src', img);
                }
                $('#link0').attr('href', link);
                $('#title0').text(split);
                $('#event0').text(split);
        
            } else if (i == 1){
                $('#eventInfo1').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#eventInfo1').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#eventInfo1').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#eventInfo1').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#eventInfo1').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#eventInfo1').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#cardLink1').attr("href", link);  
                //this one has no image
                let img = result.events[1].performers[0].image
                if (img !== null){
                    $('#img1').attr('src', img);
                }
                $('#link1').attr('href', link);
                $('#title1').text(split);
                $('#event1').text(split);  
    
            } else {
                $('#eventInfo2').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#eventInfo2').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#eventInfo2').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#eventInfo2').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#eventInfo2').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#eventInfo2').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#cardLink2').attr("href", link);
                let img = result.events[2].performers[0].image
                if (img !== null){
                    $('#img2').attr('src', img);
                }
                $('#link2').attr('href', link);
                $('#title2').text(split);
                $('#event2').text(split);  
            }
            
        }

    });

$("#searchButton").on("click", function(event) {
    event.preventDefault();

    var rawSearch = $("#autocomplete-input").val().trim();
    var search = splitString(rawSearch, ' ');
    console.log(search);

   //getting 403 error from calling this link
    var queryURL2 = 'https://api.seatgeek.com/2/events?performers.slug=' + search + '&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw';
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(responseSearch) { 
        console.log(responseSearch);
        // var result2 = responseSearch;
        
        
        });


$('#').click(function() {
        event.preventDefault();

        var queryLocal = 'https://api.seatgeek.com/2/events?geoip=true&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'
        $.ajax({
            url: queryLocal,
            method: 'GET'
        }).then(function(responseLocal) {
            console.log(responseLocal);
        })

    });
});

      

    // will have to look into getting the search bar functioning with searh lables to have this work
    $("#searchButton").on("click", function(event) {
    event.preventDefault();

    var rawSearch = $("#autocomplete-input").val().trim();
    var search = searchableString(rawSearch, ' ');
    console.log(search);


    //getting 403 error from calling this link
    var queryURL2 = 'https://api.seatgeek.com/2/events?performers.slug=' + search + '&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw';
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(responseSearch) { 
        console.log(responseSearch);
        // var result2 = responseSearch;
        
        
    });




    });
    
    // ==================
    // || LOCAL SEARCH ||
    // ==================
    // need to add id for event trigger for local search
    $('#eventsNearMe').click(function() {
        event.preventDefault();

        var queryLocal = 'https://api.seatgeek.com/2/events?geoip=true&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'
        $.ajax({
            url: queryLocal,
            method: 'GET'
        }).then(function(responseLocal) {
            console.log(responseLocal);
        })

    });
});
