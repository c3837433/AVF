// Advanced Visual Frameworks 1312
// Angela Smith
// Week 2
//Function Variables
//Function to call when the weather API is clicked
var runWeather = function () {
    console.log("Weather API Page Loaded");
    $('#reset').closest('.ui-btn').hide();
}; // end runWeather
var toggleView = function () {
    $('#lookup').show();
    $('#reset').closest('.ui-btn').hide();
    $('#resultsWea').empty();
}; // End reset toggle function

var displayData = function (results) {
    //Empty the Listview;
    $('#resultsWea').empty();
    var city = results.list[0];
    console.log(city);
    // Create a title message
    var message = "<h4>Current conditions for " + city.name + ", " +
        city.sys.country + "</h4>";
    // Prepend message to the top of content
    $('#resultsWea').prepend(message);
    var pic; // create a vairable to hold dynamic picture
    var thisObj = { // create object to hold selected weather info
        all: [{
            desc: "Current Temperature: " + city.main.temp +
                "&degF",
            asideTop: "Max: " + city.main.temp_max + "&degF",
            asideBot: "Min: " + city.main.temp_min + "&degF",
            id: "temp"
        }, {
            desc: "Conditions: " + city.weather[0].description,
            asideTop: "Humidity: " + city.main.humidity,
            asideBot: "Pressure: " + city.main.pressure,
            id: "clouds"
        }, {
            desc: "Wind speed: " + city.wind.speed + " mps",
            asideTop: city.wind.deg + "&deg",
            id: "wind"
        }]
    }; // end thisObj object
    console.log(thisObj);
    $.each(thisObj.all, function (i, value) { // loop through the selected info
        console.log(thisObj.all);
        var pic;
        if (value.id === "temp") { // determine which picture to use
            pic = "temp.png";
        } else if (value.id === "clouds") {
            pic = "weather.png";
        } else if (value.id === "wind") {
            pic = "wind.png";
        }; // end conditional
        console.log(value);
        if (value.asideBot === undefined) {
            value.asideBot = "";
        }
        var list = "<li><img src='../www/img/" + pic + "'/><h2>" +
            value.desc + "</h2><p class='ui-li-aside'>" + value.asideTop +
            "<br>" + value.asideBot + "</p></li>";
        // create the line item and add it to the listview
        $('#resultsWea').append(list);
    });
    $('#location').val("");
    $('#resultsWea').listview('refresh'); //refresh the listview
}; // end displayData function

var getDetails = function () {
    $('#lookup').hide();
    $('#reset').closest('.ui-btn').show();
    var loc = $('#location').val();
    var weaApi = "http://openweathermap.org/data/2.5/find?q='" + loc +
        "'&mode=json&units=imperial&APPID=APIKEY&callback=?&APPID=0fcc58f268f4c29a6e524be5dd1e8fd7";
    $.ajax({
        "url": weaApi,
        "dataType": "jsonp",
        "success": function (data) {
            //console.log(data);
            displayData(data);
        } // end success
    }); // end ajax call
    return false;
}; // end get details function

//Function to call when the Instagram API is clicked
var runInstagram = function () {
    console.log("Instagram API Page Loaded");
    $('#resultsInst').empty();
}; // end runInstagram

var displayImages = function (results) {
    //Empty the Listview
    $('#resultsInst').empty();
    console.log(results);
    // Sample HTML
    //<img src="url" alt="user_fullname"/><h2>username</h2><p>caption<p/><p>filter</p>
    $.each(results.data, function (index, value) {
        var loc;
        if (value.location !== null) { // if the location is not empty
            console.log(value.location);
            if (value.location.name !== null) { // and if the name is not empty use it
                console.log(value.location.name);
                loc = value.location.name;
            }
        } else { // otherwise skip it
            loc = "";
        }
        if (loc === undefined) { // if the location is still undefined (had geo without a name) set to blank
            loc = " ";
        }
        var image = "<li><h2>" + value.user.username +
            "</h2><h3 class='ui-li-aside'>Likes &hearts; " +
            value.likes.count + "<h3><img src='" + value.images.standard_resolution
            .url + "' id="inst" alt='" + value.user.full_name + "'/><p>" +
            loc + "</p><p>" + value.tags + "</p></li>";
        $('#resultsInst').append(image);
    }); // end loop through retrieved results
}; // end displayImages function

var getImages = function () {
    // get the value from the search field
    var tag = $('#tag').val();
    console.log(tag);
    // Instagram API Endpoints link for recent popular images. 
    //https://api.instagram.com/v1/media/popular?client_id=CLIENT-ID. 
    //https://api.instagram.com/v1/tags/snow/media/recent?access_token=ACCESS-TOKEN
    //Replace client with my data. Without callback=?&amp; will not receive results
    var api = "https://api.instagram.com/v1/tags/" + tag +
        "/media/recent?callback=?&amp;client_id=bf7a180389d34095a78d6f44b6660f73";
    $.getJSON(api, displayImages);
    return false; // stop page from changing
};

var whenReady = function () {
    $("#weather").on("pageinit", runWeather);
    $("#instagram").on("pageinit", runInstagram);
    $('#getImages').on('click', getImages);
    $('#getWeath').on('click', getDetails);
    $('#reset').on('click', toggleView);
}; // end phonegap whenReady

//Listen for when the device is ready, and call functions when clicked
document.addEventListener("deviceready", whenReady, false);