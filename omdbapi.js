//put in apikey
var apiKey = "f2c0a94c"

//place movie database in url
var url = "http://www.omdbapi.com/?t="
var apiKey = "&apikey=" + apiKey

//add them both together
var url = url + "lost" + apiKey

d3.json(url).then(function(data) {
    console.log(data);
});