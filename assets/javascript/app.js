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
var result = '';
var locations = [''];
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
        let venueLL = result.events[i].venue.location;
        console.log(venueLL);
        locations.push(venueLL);
        console.log(locations);

        let venueTime = result.events[i].datetime_utc;
        venueTime = moment(venueTime).format('LLLL');

            // ==================
            // || CARD ELEMENT ||
            // ==================

            // if (i == 0){
                $('#eventInfo' + i).append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#eventInfo' + i).append('<p><b>Address: </b><br>' + venueAddy + '<br>');
                $('#eventInfo' + i).append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#eventInfo' + i).append('<p><b>Average Price: </b>$' + avgPrice + '</p><br>');
                    $('#eventInfo' + i).append('<p><b>Low Price: </b>$' + lowPrice + '</p><br>');
                }
                $('#eventInfo' + i).append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#cardLink' + i).attr("href", link);
                //moved image due to bugs
                let img = result.events[i].performers[0].image;
                if (img !== null){
                    $('#img' + i).attr('src', img);
                }
                $('#link' + i).attr('href', link);
                $('#title' + i).text(splitunedit);
                $('#event' + i).text(split);
        
            // } else if (i == 1){
            //     $('#eventInfo1').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
            //     $('#eventInfo1').append('<p><b>Address: </b><br>' + venueAddy + '<br>');
            //     $('#eventInfo1').append(venueZip + '</p><br>');
            //     if (avgPrice !== null || lowPrice !==null){
            //         $('#eventInfo1').append('<p><b>Average Price: </b>$' + avgPrice + '</p><br>');
            //         $('#eventInfo1').append('<p><b>Low Price: </b>$' + lowPrice + '</p><br>');
            //     }
            //     $('#eventInfo1').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
            //     $('#cardLink1').attr("href", link);  
            //     //this one has no image
            //     let img = result.events[1].performers[0].image
            //     if (img !== null){
            //         $('#img1').attr('src', img);
            //     }
            //     $('#link1').attr('href', link);
            //     $('#title1').text(splitunedit);
            //     $('#event1').text(split);  
    
            // } else {
            //     $('#eventInfo2').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
            //     $('#eventInfo2').append('<p><b>Address: </b><br>' + venueAddy + '<br>');
            //     $('#eventInfo2').append(venueZip + '</p><br>');
            //     if (avgPrice !== null || lowPrice !==null){
            //         $('#eventInfo2').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
            //         $('#eventInfo2').append('<p><b>Low Price: </b>$' + lowPrice + '</p><br>');
            //     }
            //     $('#eventInfo2').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
            //     $('#cardLink2').attr("href", link);
            //     let img = result.events[2].performers[0].image
            //     if (img !== null){
            //         $('#img2').attr('src', img);
            //     }
            //     $('#link2').attr('href', link);
            //     $('#title2').text(splitunedit);
            //     $('#event2').text(split);  
            // }
            
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
        console.log(responsePopular);
        result = responsePopular;
        displayCard();
    });
    $('#totalResultsPageDiv').hide();

// =====================
// || SEARCH FUNCTION ||
// =====================

$("#landingSearchButton").on("click", function(event) {
        event.preventDefault();
        $('#totalLandingPageDiv').hide();
        $('#totalResultsPageDiv').slideDown();
        // window.location = 'results.html'
        let rawSearch = $("#autocomplete-input").val().trim();
        let search = searchString(rawSearch, ' ');
        var queryURL2 = 'https://api.seatgeek.com/2/events?performers.slug=' + search + '&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw';
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(responseSearch) { 
            console.log(responseSearch.events[0]);
            if (responseSearch.events[0] == undefined){
                return;
            }
            $('#event0').empty();
            $('#event1').empty();
            $('#event2').empty();
            $('#event3').empty();
            $('#event4').empty();
            $('#event5').empty();
            $('#event6').empty();
            $('#event7').empty();
            $('#event8').empty();
            $('#event9').empty();
            let img = responseSearch.events[0].performers[0].image;
            if (img !== null){
                    $('#img').attr('src', img);
                }
            $('#h1').slideDown();
            $('#h2').slideDown();
            $('#h3').slideDown();
            $('#h4').slideDown();
            $('#h5').slideDown();
            $('#h6').slideDown();
            $('#h7').slideDown();
            $('#h8').slideDown();
            $('#h9').slideDown();
            // will have to take another look at this for loop if we want to implement pagination
            for (i = 0; i <= 9; i++) {
                let title = responseSearch.events[i].title;
        //let splitTitle = title.split('-', 1);
        //let splitTitle = title.split('(', 1);
                let link = responseSearch.events[i].url;           
            //venue info/stats stored in lets.
                let venueInfo = responseSearch.events[i].venue.name;
                let venueAddy = responseSearch.events[i].venue.address;
                let venueZip = responseSearch.events[i].venue.extended_address;
                let avgPrice = responseSearch.events[i].stats.average_price;
                let lowPrice = responseSearch.events[i].stats.lowest_price;

                let venueLL = responseSearch.events[i].venue.location;
                console.log(venueLL);
                locations.push(venueLL);
                console.log(locations);

                let venueTime = responseSearch.events[i].datetime_utc;
                venueTime = moment(venueTime).format('LLLL');
                console.log(venueInfo);
            //display information
            if (i == 0){
                $('#sevent0').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent0').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent0').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent0').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent0').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent0').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#slink0').attr('href', link);
                $('#stitle0').text(title);
                if (responseSearch.events.length == 1){
                    $('#h1').hide();
                    $('#h2').hide();
                    $('#h3').hide();
                    $('#h4').hide();
                    $('#h5').hide();
                    $('#h6').hide();
                    $('#h7').hide();
                    $('#h8').hide();
                    $('#h9').hide();
                } else if (responseSearch.events.length == 2){
                    $('#h2').hide();
                    $('#h3').hide();
                    $('#h4').hide();
                    $('#h5').hide();
                    $('#h6').hide();
                    $('#h7').hide();
                    $('#h8').hide();
                    $('#h9').hide();
                } else if (responseSearch.events.length == 3){
                    $('#h3').hide();
                    $('#h4').hide();
                    $('#h5').hide();
                    $('#h6').hide();
                    $('#h7').hide();
                    $('#h8').hide();
                    $('#h9').hide();
                } else if (responseSearch.events.length == 4){
                    $('#h4').hide();
                    $('#h5').hide();
                    $('#h6').hide();
                    $('#h7').hide();
                    $('#h8').hide();
                    $('#h9').hide();
                } else if (responseSearch.events.length == 5){
                    $('#h5').hide();
                    $('#h6').hide();
                    $('#h7').hide();
                    $('#h8').hide();
                    $('#h9').hide();
                } else if (responseSearch.events.length == 6){
                    $('#h6').hide();
                    $('#h7').hide();
                    $('#h8').hide();
                    $('#h9').hide();
                } else if (responseSearch.events.length == 7){
                    $('#h7').hide();
                    $('#h8').hide();
                    $('#h9').hide();
                } else if (responseSearch.events.length == 8){
                    $('#h8').hide();
                    $('#h9').hide();
                } else if (responseSearch.events.length == 9){
                    $('#h9').hide();
                }
        
            } else if (i == 1){
                $('#sevent1').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent1').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent1').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent1').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent1').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent1').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle1').text(title);  
    
            } else if (i == 2){
                $('#sevent2').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent2').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent2').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent2').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent2').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent2').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle2').text(title);

            } else if (i == 3){
                $('#sevent3').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent3').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent3').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent3').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent3').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent3').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle3').text(title);

            } else if (i == 4){
                $('#sevent4').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent4').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent4').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent4').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent4').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent4').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle4').text(title);

            } else if (i == 5){
                $('#sevent5').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent5').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent5').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent5').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent5').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent5').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle5').text(title);

            } else if (i == 6){
                $('#sevent6').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent6').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent6').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent6').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent6').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent6').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle6').text(title);

            } else if (i == 7){
                $('#sevent7').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent7').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent7').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent7').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent7').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent7').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle7').text(title);

            } else if (i == 8){
                $('#sevent8').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent8').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent8').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent8').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent8').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent8').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle8').text(title);
                
            } else if (i == 9){
                $('#sevent9').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#sevent9').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#sevent9').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#sevent9').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#sevent9').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#sevent9').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#stitle9').text(title);
                }
            }
        });
    });
    
// ==================
// || LOCAL SEARCH ||
// ==================
    
    $('#eventsNearMe').click(function() {
        event.preventDefault();
        // window.location = 'local.html'

        var queryLocal = 'https://api.seatgeek.com/2/events?geoip=true&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'
        $.ajax({
            url: queryLocal,
            method: 'GET'
        }).then(function(responseLocal) {
            console.log(responseLocal);
            result = responseLocal;
            displayCard();
        })

        
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