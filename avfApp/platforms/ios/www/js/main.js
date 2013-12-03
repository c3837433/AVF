// Advanced Visual Frameworks 1312
// Angela Smith
// Week 2
              
document.addEventListener("deviceready", whenReady, false);
// Listen for when Phonegap is ready, and call functions when clicked
function whenReady() {
    console.log("Device is ready");
    //Listen for links to be clicked and call their functions.
    $("#weather").on("pageinit", runWeather);
    $("#instagram").on("pageinit", runInstagram);
}; // end phonegap whenReady

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
	// get the value from the search field
	//var tag = $('#tag').val();
	//console.log(tag);
    
};// end runInstagram
/*
 Instagram API info
 CLIENT ID	2599f607aa5047dc979bee933438ef61
 CLIENT SECRET	ceec11d7fbd343ec8bf5e3c332ca53f4
 */

