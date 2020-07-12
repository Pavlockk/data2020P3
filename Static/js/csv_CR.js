
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

        if (d.Title === movie) {


                var netflix = Boolean(d.Netflix);
                var hulu = Boolean(d.Hulu);
                var primevideo = Boolean(d.PrimeVideo);
                var disney = Boolean(d["Disney+"]);
                   
            
                if (netflix && hulu && primevideo && disney) {
                    description = "This film is available on Netflix, Hulu, PrimeVideo and Disney+.";
                    console.log(description);
                
                
                
                } else if (netflix && hulu) {
                    description = "This film is available on Netflix.";
                    console.log(description);
            
                } else if (hnetflix && primevideo) {
                    description = "This film is available on Hulu.";
                    console.log(description);
            
                } else if (primevideo) {
                    description = "This film is available on Prime Video.";
                    console.log(description);
            
                } else if (disney) {
                    description = "This film is available on Disney+.";
                    console.log(description);
            
                } else if (netflix) {
                    description = "This film is available on Netflix and Hulu.";
                    console.log(description);
            
                } else if (hulu) {
                    description = "This film is available on Netflix and PrimeVideo.";
                    console.log(description);
            
                } else if (netflix && disney) {
                    description = "This film is available on Netflix and Disney+.";
                    console.log(description);
            
                } else if (hulu && primevideo) {
                    description = "This film is available on Hulu and PrimeVideo.";
                    console.log(description);
            
                } else if (hulu && disney) {
                    description = "This film is available on Hulu and Disney+.";
                    console.log(description);
                
                } else if (primevideo && disney) {
                    description = "This film is available on PrimeVideo and Disney+.";
                    console.log(description);
                
                } else {
                    description = "This film cannot be found.";

                }


            
        }
        
      
            
            
        
    
         
    });
     
})}; 

    
d3.select("#submit").on("click", handleSubmit);


