$(document).load(function() {

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


    $('#h1').hide();
    $('#h2').hide();
    //search
    // $("#searchButton").on("click", function(event) {
    var queryLocal = 'https://api.seatgeek.com/2/events?geoip=true&client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw'
    $.ajax({
        url: queryLocal,
        method: 'GET'
    }).then(function(responseLocal) {
        console.log(responseLocal);
    
        event.preventDefault();
        $('#event0').empty();
        $('#event1').empty();
        $('#event2').empty();
        // window.location = 'results.html'
        
        let img = responseSearch.events[0].performers[0].image;
        if (img !== null){
                $('#img').attr('src', img);
            }
        $('#h1').slideDown();
        $('#h2').slideDown();
        for (i = 0; i <= 2; i++) {
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
            } else if (responseSearch.events.length == 2){
                $('#h2').hide();
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

        } else {
            $('#event2').append('<p><b>Venue: </b><br>' + venueInfo + '</p><br>');
            $('#event2').append('<p><b>Address: </b><br>' + venueAddy+ '<br>');
            $('#event2').append(venueZip + '</p><br>');
            if (avgPrice !== null || lowPrice !==null){
                $('#event2').append('<p><b>Average Price: </b>$' + avgPrice+ '</p><br>');
                $('#event2').append('<p><b>Low Price: </b>$' + lowPrice+ '</p><br>');
            }
            $('#event2').append('<p><b>Event Time: </b><br>' + venueTime + '</p><br>');
            $('#title2').text(title);
            }
        }
    });
});