// //put in apikey
// var apiKey = "f2c0a94c"

// //place movie database in url
// var url = "http://www.omdbapi.com/?t="
// var apiKey = "&apikey=" + apiKey


// //create a variable that will take user input
// //and search OMDB for it.
// //possibly need encodeURI?
// var userInput = ['the matrix']

// //add them both together
// var url = url + userInput + apiKey

// function moviePoster() {
//     d3.json(url).then(function(data) {
//         console.log(data);

//         var image = data.Poster;

//         if(image !== "N/A") {

//         }



//     });

// }

// Submit Button handler
function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input value from the form
    var movie = d3.select("#movieInput").node().value;
    console.log(movie);

    // clear the input value
    d3.select("#movieInput").node().value = "";

    // Build the plot with the new movie
    buildMovie(movie);
}

function buildMovie(movie) {
    var apiKey = "f2c0a94c";

    var url = `http://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`;

    d3.json(url).then(function(data) {

        // Grab values from the response json object to build the plots
        var title = data.Title;
        var year = data.Year;
        var rated = data.Rated;
        var released = data.Released;
        var poster = data.Poster;
        var director = data.Director;

        console.log(title, year, rated, released, poster, director)

        var allInfo = [title, year, rated, released, poster, director];

        // //append ul
        var ul = d3.select("body").append("ul");
        var ul = d3.select("ul");

        var selection = ul.selectAll("li")
            .data(allInfo);
        selection.enter()
            .append("li")
            .merge(selection)
            .text(function(d) {
                return (d);
            });


    });
}

// buildMovie(title, poster)

// //append ul
// var ul = d3.select("body").append("ul");

// var ul = d3.select("ul");


// var selection = ul.selectAll("li")
//     .data(title, poster);
// selection.enter()
//     .append("li")
//     .merge(selection)
//     .text(function(d) {
//         return d;
//     });

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);