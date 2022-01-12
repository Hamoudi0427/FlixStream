/* Edits popup based on user selected watch providers and movie searches */

/* Amazon Prime Video */

//get intial styled based on predefined state
chrome.storage.sync.get(['prime_video'], (result) => {
    //get current prime video state
    let prime_video_state = result.prime_video;

    //get reference to the image icon
    const prime_video_icon = document.querySelector(".prime_video_icon");

    //change styling based on that state
    if (prime_video_state){
        prime_video_icon.style.border = "4px solid lightblue";
        prime_video_icon.setAttribute("class", "prime_video_icon selected");
    }
    else{
        prime_video_icon.style.border = "3px solid grey";
        prime_video_icon.setAttribute("class", "prime_video_icon unselected");
    }
});

//add event listener that will change icon style and value based on click (user changing preference)
document.querySelector(".prime_video_icon").addEventListener("click", () => {
    const prime_video_icon = document.querySelector(".prime_video_icon");

    if (prime_video_icon.getAttribute("class") === "prime_video_icon selected"){
        prime_video_icon.setAttribute("class", "prime_video_icon unselected");
        prime_video_icon.style.border = "3px solid grey";
        chrome.storage.sync.set({prime_video : false});
    }
    else{
        prime_video_icon.style.border = "4px solid lightblue";
        prime_video_icon.setAttribute("class", "prime_video_icon selected");
        chrome.storage.sync.set({prime_video : true});
    }

    chrome.storage.sync.get(['prime_video'], (state) => console.log(`Prime Video State: ${state.prime_video}.\n`));
});

/* Disney Plus */

//get intial styled based on predefined state
chrome.storage.sync.get(['disney_plus'], (result) => {
    //get current disney plus state
    let disney_plus_state = result.disney_plus;

    //get reference to the image icon
    const disney_plus_icon = document.querySelector(".disney_plus_icon");

    //change styling based on that state
    if (disney_plus_state){
        disney_plus_icon.style.border = "4px solid lightblue";
        disney_plus_icon.setAttribute("class", "disney_plus_icon selected");
    }
    else{
        disney_plus_icon.style.border = "3px solid grey";
        disney_plus_icon.setAttribute("class", "disney_plus_icon unselected");
    }
});

//add event listener that will change icon style and value based on click (user changing preference)
document.querySelector(".disney_plus_icon").addEventListener("click", () => {
    const disney_plus_icon = document.querySelector(".disney_plus_icon");

    if (disney_plus_icon.getAttribute("class") === "disney_plus_icon selected"){
        disney_plus_icon.setAttribute("class", "disney_plus_icon unselected");
        disney_plus_icon.style.border = "3px solid grey";
        chrome.storage.sync.set({disney_plus : false});
    }
    else{
        disney_plus_icon.style.border = "4px solid lightblue";
        disney_plus_icon.setAttribute("class", "disney_plus_icon selected");
        chrome.storage.sync.set({disney_plus : true});
    }

    chrome.storage.sync.get(['disney_plus'], (state) => console.log(`Prime Video State: ${state.disney_plus}.\n`));
});

/* Crave */

//get intial styled based on predefined state
chrome.storage.sync.get(['crave'], (result) => {
    //get current disney plus state
    let crave_state = result.crave;

    //get reference to the image icon
    const crave_icon = document.querySelector(".crave_icon");

    //change styling based on that state
    if (crave_state){
        crave_icon.style.border = "4px solid lightblue";
        crave_icon.setAttribute("class", "crave_icon selected");
    }
    else{
        crave_icon.style.border = "3px solid grey";
        crave_icon.setAttribute("class", "crave_icon unselected");
    }
});

//add event listener that will change icon style and value based on click (user changing preference)
document.querySelector(".crave_icon").addEventListener("click", () => {
    const crave_icon = document.querySelector(".crave_icon");

    if (crave_icon.getAttribute("class") === "crave_icon selected"){
        crave_icon.setAttribute("class", "crave_icon unselected");
        crave_icon.style.border = "3px solid grey";
        chrome.storage.sync.set({crave : false});
    }
    else{
        crave_icon.style.border = "4px solid lightblue";
        crave_icon.setAttribute("class", "crave_icon selected");
        chrome.storage.sync.set({crave : true});
    }

    chrome.storage.sync.get(['crave'], (state) => console.log(`Crave State: ${state.crave}.\n`));
});

/* Movie Found Section and Arrow */
chrome.storage.sync.get(['movie'], (result) => {
    //display current movie info on the pop up
    if (result.movie.movie_found === false){
        //show that movie is not found in the popup (default img, default arrow and title)
        const movie_header = document.querySelector(".movie h1");
        movie_header.textContent = "Movie not found on your streaming sites :(";

        const movie_image = document.querySelector(".movie_found img");
        movie_image.setAttribute("src", "../Utils/default_movie.jpg");

        const movie_arrow = document.querySelector(".movie_found_arrow i");
        movie_arrow.style.color = "lightgrey";

        const movie_link = document.querySelector(".movie_found_arrow a");
        movie_link.setAttribute("href", "");
    }
    else{
        //display that the movie is found and where
        const movie_header = document.querySelector(".movie h1");
        movie_header.textContent = `"${result.movie.movie_title}" found on ${result.movie.movie_site}`;
        
        //change arrow color to indicate movie is found
        const arrow = document.querySelector(".movie_found_arrow i");
        arrow.style.color = "lightblue";

        //change src or image
        const movie_image = document.querySelector(".movie_found img");
        movie_image.setAttribute("src", result.movie.movie_image);

        //add a link on the arrow
        const link = document.querySelector(".movie_found_arrow a");
        link.setAttribute("href", `${result.movie.movie_url}`);
        link.onclick = () => {
            chrome.tabs.create({active : true, url : link.getAttribute("href")});
        }
    }
});


