/* Find and Search for the movie using TMDB API */

//get the movie from the netflix search page
setTimeout(findSearchedMovie, 100);

//current movie info
const current_movie = {
    id : 0, 
    movie_image : "", 
    movie_site : "",
    site_url : "", 
    name : ""
};

//developer info
const key = "5c21432d53d7ca13815884308871437c";

//will find the movie entered by the user in the netflix search bar
function findSearchedMovie(){
    let no_results = document.querySelector(".noResults p");
    let suggestions = document.querySelector(".suggestions");

    if (no_results){
        let no_results_message = no_results.textContent;
        let index = [];

        for (let i = 0; i < no_results_message.length; i++){
            if (no_results_message[i] === '"'){
                index.push(i);
            }
        }

        let movie_name = no_results_message.substring(++index[0], index[1]);
        current_movie.name = movie_name;

        //call TMDB API to check if the movie/tv show is a real movie
        checkMovie(movie_name);
    }
    else if (suggestions){
        //get movie name from search bar
        const search_bar = document.querySelector("#searchInput");
        let movie_name = search_bar.getAttribute("value").replace(/\s+/g, ' ').trim().toLowerCase();
        current_movie.name = movie_name;

        //call TMDB API to check if movie exists
        checkMovie(movie_name);
    }
}

//will check if the entered movie is valid
function checkMovie(movie_name){
    //URL for movie request
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movie_name}&include_adult=false`;
    
    //make request
    let info = {};
    fetch(url)
    .then((result) => result.json())
    .then((data) => {
        //check the first page to see if there is a match
        for (let i = 0; i < data.results.length; i++){
            if (data.results[i].title.replace(/\s+/g, ' ').trim().toLowerCase() === movie_name.replace(/\s+/g, ' ').trim().toLowerCase()){
                current_movie.id = data.results[i].id;
                current_movie.movie_image = data.results[i].backdrop_path;
                
                //get watch providers
                console.log("Movie is found. Begin search for watch providers.\n");
                current_movie.name = data.results[i].title;
                getWatchProviders(current_movie.id);
                break;
            }
        }
    })
    .catch((err) => console.log(`${movie_name} could not be found.`));
}

//gets watch providers of the current movie
function getWatchProviders(movie_id){
    //build request API
    let url = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${key}`;

    fetch(url)
    .then((result) => result.json())
    .then((data) => {
        let prime_check = false, disney_check = false, crave_check = false;

        //check current status of user info
        chrome.storage.sync.get(['prime_video', 'disney_plus', 'crave'])
        .then(result => {
            if (result.prime_video === true){
                prime_check = true;
            }
            if (result.disney_plus === true){
                disney_check = true;
            }
            if (result.crave === true){
                crave_check = true;
            }
            
            //based on user choice find available sites for the selected movie
            for (let i = 0; i < data.results.CA.flatrate.length; i++){
                if (data.results.CA.flatrate[i].provider_name === "Amazon Prime Video" && prime_check){
                    console.log("Movie found on Amazon Prime Video.\n");
                    current_movie.movie_site = "Amazon Prime Video"; 
                    current_movie.site_url = "https://www.primevideo.com";
                    changeStoredMovie(); 
                    break;
                }
                else if (data.results.CA.flatrate[i].provider_name === "Disney Plus" && disney_check){
                    console.log("Movie found on Disney Plus.\n");
                    current_movie.movie_site = "Disney Plus";
                    current_movie.site_url = "https://www.disneyplus.com/en-ca"; 
                    changeStoredMovie();
                    break;
                }
                else if (data.results.CA.flatrate[i].provider_name === "Crave" && crave_check){
                    console.log("Movie Found on Crave.\n");
                    current_movie.movie_site = "Crave";
                    current_movie.site_url = "https://www.crave.ca/en";
                    changeStoredMovie();
                    break;
                }
            }

        })
    })
    .catch((err) => console.log("Error: Could not get back watch providers.\n"));
}

//updates stored movie so that it can be displayed in the popup window
function changeStoredMovie(){

    console.log("Watch Provider Found. Updating movie storage.\n");

    const update_movie = {
        movie_found : true,
        movie_url : current_movie.site_url,
        movie_title : current_movie.name,
        movie_site : current_movie.movie_site, 
        movie_image : current_movie.movie_image
    };

    //update movie in storage
    chrome.storage.sync.set({movie : update_movie});
}
