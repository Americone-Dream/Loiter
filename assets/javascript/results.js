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
//
function searchString(string, separator) {
    var stringToArray = string.split(separator);
    var joinedString = stringToArray.join('-');
    return joinedString;
}
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
            console.log(responseSearch);
            let img = responseSearch.events[0].performers[0].image;
            if (img !== null){
                    $('#img').attr('src', img);
                }
            for (i = 0; i <= 2; i++) {
                let title = responseSearch.events[i].title;
        //let splitTitle = title.split('-', 1);
        //let splitTitle = title.split('(', 1);
                let link = responseSearch.events[i].url;           
            //venue info/stats
                let venueInfo = responseSearch.events[i].venue.name;
                let venueAddy = responseSearch.events[i].venue.address;
                let venueZip = responseSearch.events[i].venue.extended_address;
                let avgPrice = responseSearch.events[i].stats.average_price;
                let lowPrice = responseSearch.events[i].stats.lowest_price;
                let venueTime = responseSearch.events[i].datetime_local;
                venueTime = moment(venueTime).format('LLLL');
                console.log(i);
            // 
            if (i == 0){
                $('#event0').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event0').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event0').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event0').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event0').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event0').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                // $('#link0').attr("href", link);
  
                $('#link0').attr('href', link);
                $('#title0').text(title);
    
        
            } else if (i == 1){
                $('#event1').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event1').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event1').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event1').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event1').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event1').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
                // $('#link1').attr("href", link);  
  
                $('#title1').text(title);  
    
            } else {
                $('#event2').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
                $('#event2').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
                $('#event2').append(venueZip + '</p><br>');
                if (avgPrice !== null || lowPrice !==null){
                    $('#event2').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                    $('#event2').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
                }
                $('#event2').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
    

                // $('#link2').attr('href', link);
                $('#title2').text(title);
            }
            }

});
});
});