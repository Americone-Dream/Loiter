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
          "Los Angeles Chargers": null,
          "Los Angeles Rams": null,
          "San Diego Padres": null,
          "San Francisco 49ers": null,
          "San Francisco Giants": null,
          "Golden State Warriors": null,
          "Oakland Raiders": null
        },
        onAutocomplete: function(){
            if($("#totalLandingPageDiv").attr("isShowing") == "true"){
                $("#landingSearchButton").click();
            }else{
                $("#searchButton").click();
            }
           
        }
      });
//========================================================================================================================
// VARIABLES
//========================================================================================================================

locations = new Array();
titleA = new Array();
var result = '';
var rawSearch = '';
var navSbar = false;
// Map setup
var platform = new H.service.Platform({
    'app_id': '4pLGlEJpsN5pPookNa3k',
    'app_code': '4ocYltkVtb1XMprLlf4zsg',
    useHTTPS: 'true'
});

// Basic layout for map
var defaultLayers = platform.createDefaultLayers();
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.normal.map,
    {
        zoom: 10,
        center: { lng: -118.2448171, lat: 34.0352762}
    });

    // Map event controls
    var mapEvents = new H.mapevents.MapEvents(map);
    map.addEventListener('tap', function(evt) {
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
        //before it was 27
        if(split[0].length > 24){
            split=split[0].slice(0,24).concat("...");
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
            if (responseSearch.events[0] == undefined){
                return;
            }
            navSbar = false;
            let collapse = responseSearch.events.length;
            $('#totalLandingPageDiv').hide();
            $("#totalLandingPageDiv").attr("isShowing","false");
            $("#totalResultsPageDiv").attr("isShowing","true");
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
        $('#totalLandingPageDiv').attr('isShowing','false');
        $('#totalResultPageDiv').attr('isShowing','true');   
    }
}
function navDisplay(){
    let collapse = result2.performers.length;
    $('#totalLandingPageDiv').hide();
    $('#totalResultsPageDiv').slideDown(); 
    titleA = [];
    for (let i = 0; i <= 9; i++) {
        $('#sevent' + i).empty();
        $('#h' + i).slideDown();
        for (let i = collapse; i <= 9; i++){
            $('#h' + i).hide();
        }
        let title = result2.performers[i].name;
        titleA.push(title);
        let link = result2.performers[i].url;           
        $('#stitle' + i).text(title);
        $('#totalLandingPageDiv').attr('isShowing','false');
        $('#totalResultPageDiv').attr('isShowing','true');       
    }
    navSbar = true;
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
$("#searchButton").hide();
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
$("#autocomplete-input").keydown(function(event){
    if(event.keyCode === 13){
        $("#landingSearchButton").trigger("click");
    }});

$("#results-autocomplete-input").keydown(function(event){
    if(event.keyCode === 13){
        $("#searchButton").trigger("click");
    }
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

// ===========================
// || HERE API MAP LOCATION ||
// ===========================

$(".collapsible-header").click(function(){
    // Set marker
    var mapLocate = $(this).attr("value");
    if (navSbar === false){    
        let latitude = locations[mapLocate].lat;
        let longitude = locations[mapLocate].lon;
        let coords = {lat:latitude, lng:longitude};
        var icon = new H.map.Icon('assets/images/anchor2.svg');
        var mapMarker = new H.map.Marker({lat:latitude, lng:longitude}, { icon: icon });
        // Search for nearby eateries and bars
        var group = new H.map.Group();
        map.addObject(group);
        var search = new H.places.Search(platform.getPlacesService()), searchResult, error;
        var params = {
            'q': 'food&drink',
            'in': latitude + ',' + longitude + ';r=1500'
        };
        function onResult(data) {
            addPlacesToMap(data.results);
        }
        function onError(data) {
            error = data;
        }
        function addPlacesToMap(result) {
            group.addObjects(result.items.map(function (place) {
            var icon = new H.map.Icon('assets/images/utensils.svg');
            var marker = new H.map.Marker({lat: place.position[0], lng: place.position[1]}, { icon: icon })
            return marker;
        }));
        }
        search.request(params, {}, onResult, onError);   
        map.addObject(mapMarker);
        map.setCenter(coords);
        map.setZoom(15);
    } else {
        rawSearch = titleA[mapLocate];
        searchDisplay();
    } 
});
// ==================
// || NAV ITEM API ||
// ==================

$(".navValue").click(function(){
    var navSearch = $(this).attr("value");
    var queryLocal3 = 'https://api.seatgeek.com/2/performers?taxonomies.name=' + navSearch + '&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'
    $.ajax({
        url: queryLocal3,
        method: 'GET'
    }).then(function(responseNav) {
        result2 = responseNav;
        navDisplay();
    });      
});    
});//document end