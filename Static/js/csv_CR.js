
function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input value from the form
    var movie = d3.select("#movieInput").node().value;
    console.log(movie);

    // Build the plot with the new movie
    buildMovie(movie);
}
function buildMovie(movie) {
    
    d3.csv("../Resources/MoviesOnStreamingPlatforms_updated.csv").then(function(data) {

 
    data.map(function(d) { 
        movie_filtered = movie.toLowerCase();


        if (d.Title.toLowerCase() === movie_filtered) {
                console.log(movie);

                var netflix = d.Netflix;
                var hulu = d.Hulu;
                var primevideo = d["Prime Video"];
                var disney = d["Disney+"];
                   
            
                if (netflix === "1" && hulu  === "1" && primevideo === "1") {
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

                } else {
                    description = "This film cannot be found.";
                    
                }


            
        }
        
      
            
            
        
    
         
    });
    if (description){
    }
    else{
        console.log("This film cannot be found.");
    }
     
})}; 

    
d3.select("#submit").on("click", handleSubmit);


