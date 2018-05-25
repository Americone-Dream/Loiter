//DOCUMENT READY
$(document).ready(function(){

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







});

var queryURL = 'https://api.seatgeek.com/2/events?client_id=MTE2OTc1MDh8MTUyNzEzODIxMC42Mw&client_secret=f3eac0382f03fe214aa73f1b37685e3747dfd3aaa34d43fd553af4ab043b602a'
// var queryURL2 = 'https://api.seatgeek.com/2/events/739515?callback=' + search;
// 'https://api.seatgeek.com/2/events?venue.state=' + search
    // $.ajax({
    //       url: queryURL,
    //       method: "GET"
    //     }).then(function(response) { 
    //     console.log(response);
    //     var result = response;
        // for (let i = 0; i < 3; i++){
            //start title
            // var title = result.events[0].title;
            // console.log(title);
            // var split = title.split('-', 1);
            // $('#title').text(split);
            // $('#event').text(split);
            // //start url
            // var link = result.events[0].url;
            // console.log(link);
            // $('#link').attr('href', link);
            // //start img
            // var img = result.events[0].performers[0].image;
            // console.log(img);
            // $('#img').attr('src', img);
            // //venue info/stats
            // var venueInfo = result.events[0].venue.name;
            // var venueAddy = result.events[0].venue.address;
            // var venueZip = result.events[0].venue.extended_address;
            // var avgPrice = result.events[0].stats.average_price;
            // var lowPrice = result.events[0].stats.lowest_price;
            // var venueTime = result.events[0].venue.datetime_local;
            // venueTime = moment(venueTime).format('LLLL');
            // console.log(venueTime);

            // //this is where we append all info inside card
            // $('#eventInfo').append('<p>Venue: <br>' + venueInfo + '</p><br>');
            // $('#eventInfo').append('<p>Address: <br>' + venueAddy+ '<br>');
            // $('#eventInfo').append(venueZip + '</p><br>');
            // $('#eventInfo').append('<p>Average Price: $' + avgPrice+ '</p>');
            // $('#eventInfo').append('<p>Low Price: $' + lowPrice+ '</p><br>');
            // $('#eventInfo').append('<p>Event Time: <br>' + venueTime + '</p><br>');
            // $('#cardLink').attr("href", link);
        // 
        
        // });

  
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) { 
                console.log(response);
                var result = response;
            
            for (let i = 0; i < 3; i++){
                let title = result.events[i].title;
                let split = title.split('-', 1);
                //start url
                let link = result.events[i].url;           
                //venue info/stats
                let venueInfo = result.events[i].venue.name;
                let venueAddy = result.events[i].venue.address;
                let venueZip = result.events[i].venue.extended_address;
                let avgPrice = result.events[i].stats.average_price;
                let lowPrice = result.events[i].stats.lowest_price;
                let venueTime = result.events[i].venue.datetime_local;
                venueTime = moment(venueTime).format('LLLL');
                console.log(i);
        
                    if (i == 0){
                        $('#eventInfo0').append('<p>Venue: <br>' + venueInfo + '</p><br>');
                        $('#eventInfo0').append('<p>Address: <br>' + venueAddy+ '<br>');
                        $('#eventInfo0').append(venueZip + '</p><br>');
                        $('#eventInfo0').append('<p>Average Price: $' + avgPrice+ '</p>');
                        $('#eventInfo0').append('<p>Low Price: $' + lowPrice+ '</p><br>');
                        $('#eventInfo0').append('<p>Event Time: <br>' + venueTime + '</p><br>');
                        $('#cardLink0').attr("href", link);
                        //moved image due to bugs
                        let img = result.events[0].performers[0].image;
                        $('#img0').attr('src', img);
                        $('#link0').attr('href', link);
                        $('#title0').text(split);
                        $('#event0').text(split);
                
                    } else if (i == 1){
                        $('#eventInfo1').append('<p>Venue: <br>' + venueInfo + '</p><br>');
                        $('#eventInfo1').append('<p>Address: <br>' + venueAddy+ '<br>');
                        $('#eventInfo1').append(venueZip + '</p><br>');
                        $('#eventInfo1').append('<p>Average Price: $' + avgPrice+ '</p>');
                        $('#eventInfo1').append('<p>Low Price: $' + lowPrice+ '</p><br>');
                        $('#eventInfo1').append('<p>Event Time: <br>' + venueTime + '</p><br>');
                        $('#cardLink1').attr("href", link);  
                        //this one has no image
                        // $('#img1').attr('src', img);
                        $('#link1').attr('href', link);
                        $('#title1').text(split);
                        $('#event1').text(split);  
         
                    } else {
                        $('#eventInfo2').append('<p>Venue: <br>' + venueInfo + '</p><br>');
                        $('#eventInfo2').append('<p>Address: <br>' + venueAddy+ '<br>');
                        $('#eventInfo2').append(venueZip + '</p><br>');
                        $('#eventInfo2').append('<p>Average Price: $' + avgPrice+ '</p>');
                        $('#eventInfo2').append('<p>Low Price: $' + lowPrice+ '</p><br>');
                        $('#eventInfo2').append('<p>Event Time: <br>' + venueTime + '</p><br>');
                        $('#cardLink2').attr("href", link);
                        // let img = result.events[2].performers[2].image
                        // $('#img2').attr('src', img);
                        $('#link2').attr('href', link);
                        $('#title2').text(split);
                        $('#event2').text(split);  
                    }
                 
                }

                });
 
