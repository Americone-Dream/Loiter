$(document).ready(function(){

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
//takes input and joins spaces with - for url search
function searchString(string, separator) {
    var stringToArray = string.split(separator);
    var joinedString = stringToArray.join('-');
    return joinedString;
}

$('#h1').hide();
$('#h2').hide();
$('#h3').hide();
$('#h4').hide();
$('#h5').hide();
$('#h6').hide();
$('#h7').hide();
$('#h8').hide();
$('#h9').hide();
//search
$("#searchButton").on("click", function(event) {
        event.preventDefault();
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
                let venueTime = responseSearch.events[i].datetime_local;
                venueTime = moment(venueTime).format('LLLL');
                console.log(venueInfo);
            //display information
            if (i == 0){
                $('#event0').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event0').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event0').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event0').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event0').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event0').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#link0').attr('href', link);
                $('#title0').text(title);
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
                $('#event1').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event1').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event1').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event1').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event1').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event1').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title1').text(title);  
    
            } else if (i == 2){
                $('#event2').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event2').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event2').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event2').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event2').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event2').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title2').text(title);

            } else if (i == 3){
                $('#event3').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event3').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event3').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event3').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event3').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event3').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title3').text(title);

            } else if (i == 4){
                $('#event4').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event4').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event4').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event4').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event4').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event4').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title4').text(title);

            } else if (i == 5){
                $('#event5').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event5').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event5').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event5').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event5').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event5').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title5').text(title);

            } else if (i == 6){
                $('#event6').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event6').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event6').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event6').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event6').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event6').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title6').text(title);

            } else if (i == 7){
                $('#event7').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event7').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event7').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event7').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event7').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event7').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title7').text(title);

            } else if (i == 8){
                $('#event8').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event8').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event8').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event8').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event8').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event8').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title8').text(title);
                
            } else if (i == 9){
                $('#event9').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event9').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event9').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event9').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event9').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event9').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                $('#title9').text(title);
                }
            }
});
});
});