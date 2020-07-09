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

        //remove information from previous search
        d3.selectAll('ul').remove();

        // Grab values from the response json object to build the plots
        var title = data.Title;
        var year = data.Year;
        var rated = data.Rated;
        var released = data.Released;
        var poster = data.Poster;
        var director = data.Director;
        var plot = data.Plot;


        // var rating_1 = +data.Ratings[0].Value.split("/")[0];
        // var rating_2 = (data.Ratings[1].Value.split("%")[0] / 10);
        // var rating_3 = (data.Ratings[2].Value.split("/")[0] / 10);

        console.log(data);

        // console.log(rating_1, rating_2, rating_3);

        console.log(title, year, rated, released, poster, director)

        var allInfo = [title, year, rated, released, poster, director];

        //append ul
        var ul = d3.select("body").append("ul");
        var ul = d3.select("ul");

        // var selection = ul.select("li")
        //     .data(title);
        // selection.enter()
        //     .append("li")
        //     .merge(selection)
        //     .text(title);

        d3.select("#poster")
            .attr('src', poster)
            .attr('height', 437)
            .attr('width', 300);



        //add title
        d3.select("ul")
            .data(title)
            .append('li')
            .text(`Title: ${title}`)

        //add year
        d3.select('ul')
            .append('li')
            .data(year)
            .text(`Release Year: ${year}`)

        //add rated
        d3.select('ul')
            .append('li')
            .data(rated)
            .text(`Parental Rating: ${rated}`)

        //add released
        d3.select('ul')
            .append('li')
            .data(released)
            .text(`Release Date: ${released}`)

        //add director
        d3.select('ul')
            .append('li')
            .data(director)
            .text(`Director: ${director}`)

        //add plot
        d3.select('ul')
            .append('li')
            .data(plot)
            .text(`Plot: ${plot}`)

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
d3.select("#submit").on("click", handleSubmit, buildMovie);
//d3.selectAll('ul').remove();