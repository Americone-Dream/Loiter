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
    
    // Map setup
    var platform = new H.service.Platform({
        'app_id': '4pLGlEJpsN5pPookNa3k',
        'app_code': '4ocYltkVtb1XMprLlf4zsg'
    });
    var defaultLayers = platform.createDefaultLayers();
    var map = new H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.normal.map,
        {
          zoom: 10,
          center: { lng: -118, lat: 34}
        });
    var mapEvents = new H.mapevents.MapEvents(map);
    map.addEventListener('tap', function(evt) {
        // only here so I can see actions being read by the map
        console.log(evt.type, evt.currentPointer.type); 
    });
    var behavior = new H.mapevents.Behavior(mapEvents);
    var ui = H.ui.UI.createDefault(map, defaultLayers);
      



//========================================================================================================================
// FUNCTIONS
//========================================================================================================================
function searchString(string, separator) {
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
        splitunedit = split;
        if(split[0].length > 27){
            split=split[0].slice(0,27).concat("...");
            
        }
        //start url
        let link = result.events[i].url;           
        //venue info/stats
        let venueInfo = result.events[i].venue.name;
        let venueAddy = result.events[i].venue.address;
        let venueZip = result.events[i].venue.extended_address;
        let avgPrice = result.events[i].stats.average_price;
        let lowPrice = result.events[i].stats.lowest_price;
        let venueTime = result.events[i].datetime_utc;
        venueTime = moment(venueTime).format('LLLL');

            // ==================
            // || CARD ELEMENT ||
            // ==================

            if (i == 0){
                $('#eventInfo0').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#eventInfo0').append('<p><b>Address: </b><br>' + venueAddy + '<br>');
                $('#eventInfo0').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#eventInfo0').append('<p><b>Average Price: </b>$' + avgPrice + '</p><br>');
                    $('#eventInfo0').append('<p><b>Low Price: </b>$' + lowPrice + '</p><br>');
                }
                $('#eventInfo0').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#cardLink0').attr("href", link);
                //moved image due to bugs
                let img = result.events[0].performers[0].image;
                if (img !== null){
                    $('#img0').attr('src', img);
                }
                $('#link0').attr('href', link);
                $('#title0').text(splitunedit);
                $('#event0').text(split);
        
            } else if (i == 1){
                $('#eventInfo1').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#eventInfo1').append('<p><b>Address: </b><br>' + venueAddy + '<br>');
                $('#eventInfo1').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#eventInfo1').append('<p><b>Average Price: </b>$' + avgPrice + '</p><br>');
                    $('#eventInfo1').append('<p><b>Low Price: </b>$' + lowPrice + '</p><br>');
                }
                $('#eventInfo1').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#cardLink1').attr("href", link);  
                //this one has no image
                let img = result.events[1].performers[0].image
                if (img !== null){
                    $('#img1').attr('src', img);
                }
                $('#link1').attr('href', link);
                $('#title1').text(splitunedit);
                $('#event1').text(split);  
    
            } else {
                $('#eventInfo2').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#eventInfo2').append('<p><b>Address: </b><br>' + venueAddy + '<br>');
                $('#eventInfo2').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#eventInfo2').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#eventInfo2').append('<p><b>Low Price: </b>$' + lowPrice + '</p><br>');
                }
                $('#eventInfo2').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#cardLink2').attr("href", link);
                let img = result.events[2].performers[0].image
                if (img !== null){
                    $('#img2').attr('src', img);
                }
                $('#link2').attr('href', link);
                $('#title2').text(splitunedit);
                $('#event2').text(split);  
            }
            
        }

    });

// =====================
// || SEARCH FUNCTION ||
// =====================

    // $("#searchButton").on("click", function(event) {
    //     event.preventDefault();
    //     // window.location = 'results.html'
    //     let rawSearch = $("#autocomplete-input").val().trim();
    //     let search = searchString(rawSearch, ' ');

    //     var queryURL2 = 'https://api.seatgeek.com/2/events?performers.slug=' + search + '&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw';
    //     $.ajax({
    //         url: queryURL2,
    //         method: "GET"
    //     }).then(function(responseSearch) { 
    //         console.log(responseSearch);
    //         // let img = responseSearch.events[0].performers[0].image;
    //         // if (img !== null){
    //         //         $('#img').attr('src', img);
    //         //     }
    //         for (i = 0; i <= 2; i++) {
    //             let title = responseSearch.events[i].title;
    //     //let splitTitle = title.split('-', 1);
    //     //let splitTitle = title.split('(', 1);
    //             let link = responseSearch.events[i].url;           
    //         //venue info/stats
    //             let venueInfo = responseSearch.events[i].venue.name;
    //             let venueAddy = responseSearch.events[i].venue.address;
    //             let venueZip = responseSearch.events[i].venue.extended_address;
    //             let avgPrice = responseSearch.events[i].stats.average_price;
    //             let lowPrice = responseSearch.events[i].stats.lowest_price;
    //             let venueTime = responseSearch.events[i].datetime_local;
    //             venueTime = moment(venueTime).format('LLLL');
    //         // 
    //         if (i == 0){
    //             $('#event0').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
    //             $('#event0').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
    //             $('#event0').append(venueZip + '</p><br>');
    //             if (avgPrice !== null || lowPrice !==null){
    //                 $('#event0').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
    //                 $('#event0').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
    //             }
    //             $('#event0').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
    //             // $('#link0').attr("href", link);
  
    //             $('#link0').attr('href', link);
    //             $('#title0').text(title);
    
        
    //         } else if (i == 1){
    //             $('#event1').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
    //             $('#event1').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
    //             $('#event1').append(venueZip + '</p><br>');
    //             if (avgPrice !== null || lowPrice !==null){
    //                 $('#event1').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
    //                 $('#event1').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
    //             }
    //             $('#event1').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
    //             // $('#link1').attr("href", link);  
  
    //             $('#title1').text(title);  
    
    //         } else {
    //             $('#event2').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
    //             $('#event2').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
    //             $('#event2').append(venueZip + '</p><br>');
    //             if (avgPrice !== null || lowPrice !==null){
    //                 $('#event2').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
    //                 $('#event2').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
    //             }
    //             $('#event2').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
    

    //             // $('#link2').attr('href', link);
    //             $('#title2').text(title);
    //         }
    //         }
    //     });
    // });
    
// ==================
// || LOCAL SEARCH ||
// ==================
    
    $('#eventsNearMe').click(function() {
        event.preventDefault();
        window.location = 'local.html'

        // var queryLocal = 'https://api.seatgeek.com/2/events?geoip=true&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'
        // $.ajax({
        //     url: queryLocal,
        //     method: 'GET'
        // }).then(function(responseLocal) {
        //     console.log(responseLocal);
        // })

        
    });

// ==============
// || HERE API ||
// ==============

    var queryHere = 'https://places.cit.api.here.com/places/v1/discover/here?at=' + lat + ',' + lgn + '&app_id=4pLGlEJpsN5pPookNa3k&app_code=4ocYltkVtb1XMprLlf4zsg'
    let lat = '';
    let lgn = '';

    $.ajax({
        url: queryHere,
        method: 'GET'
    }).then(function(responseHere) {
        console.log(responseHere);
    })

});