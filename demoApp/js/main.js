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
	}; // end phonegap whenReady
//});  // end home pageinit


//Function to call when the weather API is clicked
var runWeather = function() {
	console.log("Weather API Page Loaded");
		
}; // end runWeather
/* 
Open Weather Map APPID Key
0fcc58f268f4c29a6e524be5dd1e8fd7

Open Weather Instructions
Add the following parameter to the GET request: APPID=APIKEY 
Example: http://openweathermap.org/data/2.3/forecast/city?id=524901&APPID=1111111111
OR add the following line to http header of request to the server: x-api-key:APIKEY
*/


//Function to call when the Instagram API is clicked
var runInstagram = function() {
	console.log("Instagram API Page Loaded");		
};// end runInstagram

var getImages = function(){
	// get the value from the search field
	var tag = $('#tag').val();
	console.log(tag);
	// Instagram API Endpoints link for recent popular images. 
	//https://api.instagram.com/v1/media/popular?client_id=CLIENT-ID. 
	//https://api.instagram.com/v1/tags/snow/media/recent?access_token=ACCESS-TOKEN
	//Replace client with my data.
	var api = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=2599f607aa5047dc979bee933438ef61";
	$.getJSON(api, displayResults);
};

var displayResults = function(instData){
	console.log(instData);
}; // end displayResults function
/*
 Instagram API info
CLIENT ID	2599f607aa5047dc979bee933438ef61
CLIENT SECRET	ceec11d7fbd343ec8bf5e3c332ca53f4
 */
