var svgWidth = 350;
var svgHeight = 350;

var posterWidth = 375
var posterHeight = 500

// Define the chart's margins as an object
var chartMargin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

var posterMargin = {
    left: 2,
    top: 2
}

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


var posterSvg = d3.select("#chartPoster")
    .append("svg")
    .attr("height", posterHeight)
    .attr("width", posterWidth);
var posterGroup = posterSvg.append("g")
    .attr("transform", `translate(${posterMargin.left}, ${posterMargin.top})`);



// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#ratingChart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);





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
    buildMovie2(movie);
}

function buildMovie(movie) {
    var apiKey = "f2c0a94c";

    var url = `http://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`;



    d3.json(url).then(function(data) {

        //remove information from previous search
        d3.selectAll('ul').remove();

        d3.select('chartPoster').remove();

        d3.selectAll('li').remove();
        d3.selectAll('.poster').remove();
        d3.selectAll('.rating').remove();


        // Grab values from the response json object to build the plots
        var title = data.Title;
        var year = data.Year;
        var rated = data.Rated;
        var released = data.Released;
        var poster = data.Poster;
        var director = data.Director;
        var plot = data.Plot;
        var genre = data.Genre.split(", ");
        var genreLength = genre.length;
        var genreData = [];
        var genreRange = [];

        var genres = ["Comedy", "Sci-Fi", "Thriller", "Horror", "Romance", "Action", "Drama", "Mystery", "Crime", "Animation", "Adventure", "Fantasy", "Comedy-Romance", "Action-Comedy", "Superhero"];
        var genreHolder = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


        // var rating_1 = +data.Ratings[0].Value.split("/")[0];
        // var rating_2 = (data.Ratings[1].Value.split("%")[0] / 10);
        // var rating_3 = (data.Ratings[2].Value.split("/")[0] / 10);
        var IMDB_rating = +data.Ratings[0].Value.split("/")[0];

        var Ratings_1 = [
            { "name": "IMDB", "rating": IMDB_rating }
        ];

        if (data.Ratings[1]) {
            var Rotten_rating = (data.Ratings[1].Value.split("%")[0] / 10);
            Ratings_1.push({ "name": "RT", "rating": Rotten_rating });
        };

        // if (typeof Rotten_rating != "undefined"){
        //     Ratings_1.push({"name": "Rotten Tomatoes", "rating": Rotten_rating});
        // }

        if (data.Ratings[2]) {
            var Metacritic_rating = (data.Ratings[2].Value.split("/")[0] / 10);
            Ratings_1.push({ "name": "Metacritic", "rating": Metacritic_rating });
        };

        //Data for radar chart below
        for (i = 0; i < genreLength; i++) {
            genreRange.push(genreLength - i)

        };
        genreRange[(genreLength - 1)] = 0.99;

        var genreChartData = {
            "labels": genre,
            "datasets": [{ "data": genreData }]
        }


        console.log(data);
        console.log(Ratings_1);

        // console.log(rating_1, rating_2, rating_3);

        console.log(title, year, rated, released, poster, director)

        var allInfo = [title, year, rated, released, poster, director];

        //append ul
        var ul = d3.select("#movieInfo").append("ul");
        var ul = d3.select("ul");

        // var selection = ul.select("li")
        //     .data(title);
        // selection.enter()
        //     .append("li")
        //     .merge(selection)
        //     .text(title);

        // d3.select("#poster")
        //     .attr('src', poster)
        //     .attr('height', 437)
        //     .attr('width', 300);



        //add title
        d3.select("ul")
            .data(title)
            .append('h2')
            .text(`${title}`)

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

        //add random
        d3.select('ul')
            .append('li')
            .text(description)


        posterGroup
        // .append("g")
            .append("svg:image")
            .attr("class", "poster")
            .attr('xlink:href', poster)
            .attr('height', 500)
            .attr('width', 375);



        // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
        var xBandScale = d3.scaleBand()
            .domain(Ratings_1.map(d => d.name))
            .range([0, chartWidth])
            .padding(0.1);

        // Create a linear scale for the vertical axis.
        var yLinearScale = d3.scaleLinear()
            .domain([0, 10])
            .range([chartHeight, 0]);

        // Create two new functions passing our scales in as arguments
        // These will be used to create the chart's axes
        var bottomAxis = d3.axisBottom(xBandScale);
        var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

        // Append two SVG group elements to the chartGroup area,
        // and create the bottom and left axes inside of them
        chartGroup.append("g")
            .call(leftAxis);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis);


        var rating_color = ["#ff9234", "#ffcd3c", "#35d0da"];
        // console.log(yLinearScale(Ratings_1[0].rating));
        // console.log(chartHeight);
        // console.log((chartHeight - yLinearScale(Ratings_1[0].rating)));
        // Create one SVG rectangle per piece of tvData
        // Use the linear and band scales to position each rectangle within the chart
        chartGroup.selectAll(".rating")
            .data(Ratings_1)
            .enter()
            .append("rect")
            .attr("class", "rating")
            .attr("fill", (d, i) => rating_color[i])
            .attr("x", d => xBandScale(d.name))
            .attr("y", d => yLinearScale(d.rating))
            // .attr("r", 5)
            .attr("width", xBandScale.bandwidth())
            .attr("height", d => +(chartHeight - yLinearScale(d.rating)));

        //Create Genre Chart
        var movieRadar = document.getElementById("movieRadar");
        if (movieRadar) {
            new Chart(movieRadar, {
                type: 'radar',
                data: {
                    labels: genreChartData["labels"],
                    datasets: [{
                        label: title,
                        backgroundColor: "rgba(0,0,200,0.2)",
                        borderWidth: 0,
                        data: genreRange,
                    }]
                },
            });
        }


    });

};

function streaming(movie) {

};

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


function buildMovie2(movie) {

    d3.csv("../Resources/MoviesOnStreamingPlatforms_updated.csv").then(function(data) {

        description = "undefined"

        data.map(function(d) {

            if (d.Title === movie) {


                var netflix = d.Netflix;
                var hulu = d.Hulu;
                var primevideo = d["Prime Video"];
                var disney = d["Disney+"];


                if (netflix === "1" && hulu === "1" && primevideo === "1") {
                    description = "This film is available on Netflix, Hulu and Prime Video.";
                    console.log(description);


                } else if (hulu === "1" && primevideo === "1" && disney === "1") {
                    description = "This film is available on Hulu, Prime video and Disney+";
                    console.log(description);

                } else if (netflix === "1" && hulu === "1" && disney === "1") {
                    description = "This film is available on Netflix, Hulu and Disney+.";
                    console.log(description);

                } else if (primevideo === "1" && netflix === "1" && disney === "1") {
                    description = "This film is available on Netflix, Prime Video and Disney+.";
                    console.log(description);

                } else if (netflix === "1" && disney === "1") {
                    description = "This film is available on Netflix and Disney+.";
                    console.log(description);

                } else if (hulu === "1" && primevideo === "1") {
                    description = "This film is available on Hulu and Prime Video.";
                    console.log(description);

                } else if (hulu === "1" && disney === "1") {
                    description = "This film is available on Hulu and Disney+.";
                    console.log(description);

                } else if (primevideo === "1" && disney === "1") {
                    description = "This film is available on Prime Video and Disney+.";
                    console.log(description);

                } else if (netflix === "1" && hulu === "1") {
                    description = "This film is available on Netflix and Hulu.";
                    console.log(description);

                } else if (netflix === "1" && primevideo === "1") {
                    description = "This film is available on Netflix and Prime Video.";
                    console.log(description);

                } else if (disney === "1") {
                    description = "This film is available on Disney+.";
                    console.log(description);

                } else if (netflix === "1") {
                    description = "This film is available on Netflix.";
                    console.log(description);

                } else if (primevideo === "1") {
                    description = "This film is available on Prime Video.";
                    console.log(description);

                } else if (hulu === "1") {
                    description = "This film is available on Hulu.";
                    console.log(description);

                }



            }

            if (description === "undefined") {
                description = "This film is not on Netflix, Prime Video, Disney+ or Hulu."
                console.log("This film cannot be found.");
            }


        });

    })
};

// Add event listener for submit button
d3.select("#submit").on("load", handleSubmit, buildMovie("Inception"), buildMovie2("Inception"));
d3.select("#submit").on("click", handleSubmit, buildMovie, buildMovie2);

//function yearChart() {

//    d3.csv("../Resources/MoviesOnStreamingPlatforms_updated.csv").then(function(data) {

//        description = "undefined";

//        var timeRange = [];
//        var dataLength = 10;
//        data.map(function(d) {
//            for (i = 0; i < dataLength; i++) {
//                timeRange.push(d.Year)
//            };

//            var minYear = Math.min(timeRange);
//            var maxYear = Math.max(timeRange);

//            console.log(minYear);
//            console.log(maxYear);


//var genreChartData = {
//  "labels": genre,
//"datasets": [{"data": genreData}]
//}
//        });

//    })
//};

// chart colors
var colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];

/* large line chart */
//var movieLine = document.getElementById("movieLine");
//var chartData = {
//  labels: ["S", "M", "T", "W", "T", "F", "S"],
//  datasets: [{
//    data: [589, 445, 483, 503, 689, 692, 634],
//    backgroundColor: 'transparent',
//    borderColor: colors[0],
//    borderWidth: 4,
//    pointBackgroundColor: colors[0]
//  },
//  {
//    data: [639, 465, 493, 478, 589, 632, 674],
//    backgroundColor: colors[3],
//    borderColor: colors[1],
//    borderWidth: 4,
//    pointBackgroundColor: colors[1]
//  }]
//};

//if (movieLine) {
//  new Chart(movieLine, {
//  type: 'line',
//  data: chartData,
//  options: {
//    scales: {
//      yAxes: [{
//        ticks: {
//          beginAtZero: false
//        }
//      }]
//    },
//    legend: {
//      display: false
//    }
//  }
//  });
//}