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
locations = new Array();
var result = '';
var rawSearch = '';
    // Map setup
    var platform = new H.service.Platform({
        'app_id': '4pLGlEJpsN5pPookNa3k',
        'app_code': '4ocYltkVtb1XMprLlf4zsg',
        useHTTPS: 'true'
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
function displayCard(){
    $('#eventInfo0').empty();
    $('#eventInfo1').empty();
    $('#eventInfo2').empty();
    for (let i = 0; i < 3; i++){
        let title = result.events[i].title;
        let split = title.split('(', 1);
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
   
            $('#eventInfo' + i).append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
            $('#eventInfo' + i).append('<p><b>Address: </b><br>' + venueAddy + '<br>');
            $('#eventInfo' + i).append(venueZip + '</p><br>');
            if (avgPrice !== null || lowPrice !==null){
                $('#eventInfo' + i).append('<p><b>Average Price: </b>$' + avgPrice + '</p><br>');
                $('#eventInfo' + i).append('<p><b>Low Price: </b>$' + lowPrice + '</p><br>');
            }
            $('#eventInfo' + i).append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
            $('#cardLink' + i).attr("href", link);
            let img = result.events[i].performers[0].image;
            $('#img' + i).attr('src', 'assets/images/anchor.svg');
            if (img !== null){
                $('#img' + i).attr('src', img);
            }
            $('#link' + i).attr('href', link);
            $('#title' + i).text(splitunedit);
            $('#event' + i).text(split);
        }
}
function searchDisplay(){
        let search = searchString(rawSearch, ' ');
        var queryURL2 = 'https://api.seatgeek.com/2/events?performers.slug=' + search + '&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw';
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(responseSearch) { 
            console.log(responseSearch);
            if (responseSearch.events[0] == undefined){
                return;
            }
            let collapse = responseSearch.events.length;
            let img = responseSearch.events[0].performers[0].image;
            if (img !== null){
                    $('#img').attr('src', img);
                }
            $('#totalLandingPageDiv').hide();
            $('#totalResultsPageDiv').slideDown(); 
            locations = [];
        for (let i = 0; i <= 9; i++) {
            $('#sevent' + i).empty();
            $('#h' + i).slideDown();
            for (let i = collapse; i <= 9; i++){
                $('#h' + i).hide();
            }
            let title = responseSearch.events[i].title;
            let link = responseSearch.events[i].url;           
            //venue info
            let venueInfo = responseSearch.events[i].venue.name;
            let venueAddy = responseSearch.events[i].venue.address;
            let venueZip = responseSearch.events[i].venue.extended_address;
            let avgPrice = responseSearch.events[i].stats.average_price;
            let lowPrice = responseSearch.events[i].stats.lowest_price;
            //Long and Lat for map.
            let venueLL = responseSearch.events[i].venue.location;
            //push locations into array
            locations.push(venueLL);
            //event time
            let venueTime = responseSearch.events[i].datetime_utc;
            venueTime = moment(venueTime).format('LLLL');
            $('#sevent' + i).append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
            $('#sevent' + i).append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
            $('#sevent' + i).append(venueZip + '</p><br>');
            if (avgPrice !== null || lowPrice !==null){
                $('#sevent' + i).append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                $('#sevent' + i).append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
            }
            $('#sevent' + i).append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
            $('#slink' + i).attr('href', link);
            $('#stitle' + i).text(title);
    } //loop end
    });//ajax end
}// function end
function nearDisplay(){
    let collapse = result2.events.length;
    let img = result2.events[0].performers[0].image;
    if (img !== null){
        $('#img').attr('src', img);
        }
        $('#totalLandingPageDiv').hide();
        $('#totalResultsPageDiv').slideDown(); 
        locations = [];
    for (let i = 0; i <= 9; i++) {
        $('#sevent' + i).empty();
        $('#h' + i).slideDown();
        for (let i = collapse; i <= 9; i++){
            $('#h' + i).hide();
        }
        let title = result2.events[i].title;
        let link = result2.events[i].url;           
        //venue info
        let venueInfo = result2.events[i].venue.name;
        let venueAddy = result2.events[i].venue.address;
        let venueZip = result2.events[i].venue.extended_address;
        let avgPrice = result2.events[i].stats.average_price;
        let lowPrice = result2.events[i].stats.lowest_price;
        //Long and Lat for map.
        let venueLL = result2.events[i].venue.location;
        //push locations into array
        locations.push(venueLL);
        //event time
        let venueTime = result2.events[i].datetime_utc;
        venueTime = moment(venueTime).format('LLLL');
        $('#sevent' + i).append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
        $('#sevent' + i).append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
        $('#sevent' + i).append(venueZip + '</p><br>');
        if (avgPrice !== null || lowPrice !==null){
            $('#sevent' + i).append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
            $('#sevent' + i).append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
        }
        $('#sevent' + i).append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
        $('#slink' + i).attr('href', link);
        $('#stitle' + i).text(title);
    }

}
    // ==================
    // || LANDING PAGE ||
    // ==================

    var queryURL = 'https://api.seatgeek.com/2/events?client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(responsePopular) { 
        result = responsePopular;
        displayCard();
    });
    $('#totalResultsPageDiv').hide();

// =====================
// || SEARCH FUNCTION ||
// =====================

$("#landingSearchButton").on("click", function(event) {
        event.preventDefault();
        // window.location = 'results.html'
        rawSearch = $("#autocomplete-input").val().trim();
        searchDisplay(); 
        });
$("#searchButton").on("click", function(event) {
        event.preventDefault();
        rawSearch = $("#results-autocomplete-input").val().trim();
        searchDisplay();
        });

// ==================
// || LOCAL SEARCH ||
// ==================
    
    $('#eventsNearMe').click(function() {
        event.preventDefault();
        var queryLocal = 'https://api.seatgeek.com/2/events?geoip=true&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'
        $.ajax({
            url: queryLocal,
            method: 'GET'
        }).then(function(responseLocal) {
            result2 = responseLocal;
            nearDisplay();
        })        
    });

// ==============
// || HERE API ||
// ==============

    let lat = '';
    let lgn = '';
    var queryHere = 'https://places.cit.api.here.com/places/v1/discover/here?at=' + lat + ',' + lgn + '&app_id=4pLGlEJpsN5pPookNa3k&app_code=4ocYltkVtb1XMprLlf4zsg'
    $.ajax({
        url: queryHere,
        method: 'GET'
    }).then(function(responseHere) {
        console.log(responseHere);
    });
});

// ===========================
// || HERE API MAP LOCATION ||
// ===========================

$(".collapsible-header").click(function(){
    console.log(locations);
    var mapLocate = $(this).attr("value");
    console.log(mapLocate);






}); 