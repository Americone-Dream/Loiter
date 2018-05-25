//DOCUMENT READY
$(document).ready(function(){

//========================================================================================================================
// jQuery for Materialize Design Elements
//========================================================================================================================
    // Initializes all of the Materialize Components with a single function call 
    M.AutoInit();   

    //for autocomplete search bar
    $('input.autocomplete').autocomplete({
        data: {
          "Los Angeles Galaxy": null,
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







});


var queryURL = 'https://api.seatgeek.com/2/events?client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw&client_secret=f3eac0382f03fe214aa73f1b37685e3747dfd3aaa34d43fd553af4ab043b602a'

// 'https://api.seatgeek.com/2/events?venue.state=' + search


  
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) { 
                console.log(response);
                var result = response;
            
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
        
                    if (i == 0){
                        $('#eventInfo0').append('<p>Venue: <br>' + venueInfo + '</p><br>');
                        $('#eventInfo0').append('<p>Address: <br>' + venueAddy+ '<br>');
                        $('#eventInfo0').append(venueZip + '</p><br>');
                        if (avgPrice !== null || lowPrice !==null){
                            $('#eventInfo0').append('<p>Average Price: $' + avgPrice+ '</p>');
                            $('#eventInfo0').append('<p>Low Price: $' + lowPrice+ '</p><br>');
                        }
                        $('#eventInfo0').append('<p>Event Time: <br>' + venueTime + '</p><br>');
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
                        $('#eventInfo1').append('<p>Venue: <br>' + venueInfo + '</p><br>');
                        $('#eventInfo1').append('<p>Address: <br>' + venueAddy+ '<br>');
                        $('#eventInfo1').append(venueZip + '</p><br>');
                        if (avgPrice !== null || lowPrice !==null){
                            $('#eventInfo1').append('<p>Average Price: $' + avgPrice+ '</p>');
                            $('#eventInfo1').append('<p>Low Price: $' + lowPrice+ '</p><br>');
                        }
                        $('#eventInfo1').append('<p>Event Time: <br>' + venueTime + '</p><br>');
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
                        $('#eventInfo2').append('<p>Venue: <br>' + venueInfo + '</p><br>');
                        $('#eventInfo2').append('<p>Address: <br>' + venueAddy+ '<br>');
                        $('#eventInfo2').append(venueZip + '</p><br>');
                        if (avgPrice !== null || lowPrice !==null){
                            $('#eventInfo2').append('<p>Average Price: $' + avgPrice+ '</p>');
                            $('#eventInfo2').append('<p>Low Price: $' + lowPrice+ '</p><br>');
                        }
                        $('#eventInfo2').append('<p>Event Time: <br>' + venueTime + '</p><br>');
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

      




          
            
