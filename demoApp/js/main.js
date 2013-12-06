// Advanced Visual Frameworks 1312
// Angela Smith
// Week 2


// Begin Home page functions
/*$('#home').on('pageinit', function(){
    //code needed for home page
    console.log("Home Page Loaded");
  */  
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

// Get research sections from Cloudant and place on research page
$(document).on('pageinit', '#research', function(){
	// set the prefix so couch can get the data
	$.couch.urlPrefix = "https://anclonceivinglostilkints:4j3TjFQwuCqKIBv0VFeO0t5i@angessmith.cloudant.com";
	$.couch.db("demo").view("app/research", {
    	success: function(data) {  
    		console.log(data);
    		console.log("Research Page Loaded");
    		$.each(data.rows, function(i, resItems){
				console.log(resItems);
			}); // End loop	
		} // end success
    }); // end couch plugin
}); // end pageinit
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
	//$('#resultsWea').show();
	$('#resultsWea').listview('refresh');
	//$('#reset').show();
	//refresh the listview			
}; // end displayData function
/* 
Open Weather Map APPID Key
0fcc58f268f4c29a6e524be5dd1e8fd7

Open Weather Instructions
Add the following parameter to the GET request: APPID=APIKEY 
Example: http://openweathermap.org/data/2.3/forecast/city?/id=524901&APPID=1111111111
OR add the following line to http header of request to the server: x-api-key:APIKEY
*/


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
	return false;

};
var displayImages = function(results){
	//Empty the Listview
	$('#resultsInst').empty();
	// Sample HTML
	//<img src="url" alt="user_fullname"/><h2>username</h2><p>caption<p/><p>filter</p>
	$.each(results.data, function(index, value){
		var image = "<li><img src='" + value.images.standard_resolution.url + "' alt='" + value.user.full_name + "'/><h2>" + value.user.username + "</h2><p>Current likes: " + value.likes.count + "</p></li>";
	$('#resultsInst').append(image);	
	}); // end loop through retrieved results
};  // end displayImages function

/*
 Instagram API info
CLIENT ID	2599f607aa5047dc979bee933438ef61
CLIENT SECRET	ceec11d7fbd343ec8bf5e3c332ca53f4
 */