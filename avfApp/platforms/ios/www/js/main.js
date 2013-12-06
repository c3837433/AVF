// Advanced Visual Frameworks 1312
// Angela Smith
// Week 2

document.addEventListener("deviceready", whenReady, false);
// Listen for when the device is ready, and call functions when clicked
function whenReady() {
    $("#weather").on("pageinit", runWeather);
    $("#instagram").on("pageinit", runInstagram);
    $('#getImages').on('click', getImages);
    $('#getWeath').on('click', getDetails);
    $('#reset').on('click', toggleView);
}; // end phonegap whenReady
//});  // end home pageinit

//Function to call when the weather API is clicked
var runWeather = function() {
	console.log("Weather API Page Loaded");
	$('#reset').closest('.ui-btn').hide();
}; // end runWeather
var toggleView = function(){
	$('#lookup').show();
    $('#reset').closest('.ui-btn').hide();
    $('#resultsWea').empty(); 
};  // End reset toggle function

var getDetails = function(){
	$('#lookup').hide();
    $('#reset').closest('.ui-btn').show();
	var loc = $('#location').val();
	var weaApi = "http://openweathermap.org/data/2.5/find?q='" + loc + "'&mode=json&units=imperial&APPID=APIKEY&callback=?&APPID=0fcc58f268f4c29a6e524be5dd1e8fd7";
	$.ajax({
    	"url":weaApi,
        "dataType": "jsonp",
        "success": function(data) {
        	//console.log(data);
        	displayData(data);       
          } // end success
	}); // end ajax call
	return false;
}; // end get details function

var displayData = function(results){
	//Empty the Listview;
	$('#resultsWea').empty();
	var city = results.list[0];
	console.log(city);
	// Create a title message
	var message = "<h4>Current conditions for " + city.name + ", " + city.sys.country + "</h4>";
	// Prepend message to the top of content
	$('#resultsWea').prepend(message);
	var thisObj = {
		temp : "Current Temperature: "+ city.main.temp + "&degF",
		clouds : "Conditions: " + city.weather[0].description,
		wind : "Wind speed: " + city.wind.speed + " mps" 
	}; // end thisObj object
	console.log(thisObj);
	$.each(thisObj, function(index, value){
		console.log(value);
		var list = "<li>" + value + "</li>";
		$('#resultsWea').append(list);
	});
	$('#location').val("");
	$('#resultsWea').listview('refresh'); //refresh the listview
}; // end displayData function

//Function to call when the Instagram API is clicked
var runInstagram = function() {
	console.log("Instagram API Page Loaded");
	$('#resultsInst').empty();		
};// end runInstagram

var getImages = function(){
	// get the value from the search field
	var tag = $('#tag').val();
	console.log(tag);
	// Instagram API Endpoints link for recent popular images. 
	//https://api.instagram.com/v1/media/popular?client_id=CLIENT-ID. 
	//https://api.instagram.com/v1/tags/snow/media/recent?access_token=ACCESS-TOKEN
	//Replace client with my data. Without callback=?&amp; will not receive results
	var api = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=bf7a180389d34095a78d6f44b6660f73";
	$.getJSON(api, displayImages);
	return false; // stop page from changing
};
var displayImages = function(results){
	//Empty the Listview
	$('#resultsInst').empty()
	console.log(results);
	// Sample HTML
	//<img src="url" alt="user_fullname"/><h2>username</h2><p>caption<p/><p>filter</p>
	$.each(results.data, function(index, value){
           if (value.location !=null) { // if the location is not empty
           console.log(value.location);
           if(value.location.name != null) { // and if the name is not empty use it
           console.log(value.location.name);
           var loc = value.location.name;
           }
           } else { // otherwise skip it
		   var loc = "";
           }
           if (loc === undefined){ // if the location is still undefined (had geo without a name) set to blank
           var loc = " ";
           }
           var image = "<li><h2>" + value.user.username +"</h2><h3 class='ui-li-aside'>Likes &hearts; " + value.likes.count + "<h3><img src='" + value.images.standard_resolution.url + "' alt='" + value.user.full_name + "'/><p>" + loc + "</p><p>" + value.tags + "</p></li>";
           $('#resultsInst').append(image);
           }); // end loop through retrieved results
};  // end displayImages function
