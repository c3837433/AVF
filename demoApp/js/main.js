// Advanced Visual Frameworks 1312
// Angela Smith
// Week 2

/* 
Open Weather Map APPID Key
0fcc58f268f4c29a6e524be5dd1e8fd7

Open Weather Instructions
Add the following parameter to the GET request: APPID=APIKEY 
Example: http://openweathermap.org/data/2.3/forecast/city?id=524901&APPID=1111111111
OR add the following line to http header of request to the server: x-api-key:APIKEY
*/

/*
 Instagram API info
CLIENT ID	2599f607aa5047dc979bee933438ef61
CLIENT SECRET	ceec11d7fbd343ec8bf5e3c332ca53f4
 */


// Begin Weather page functions
$('#weather').on('pageinit', function(){
    //code needed for weather page
    console.log("Weather API Page Loaded");
});  // end weather pageinit

// Begin Instagram page functions
$('#instagram').on('pageinit', function(){
    //code needed for Instagram page
    console.log("Instagram API Page Loaded");
});  // end Instagram pageinit