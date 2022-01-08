/* Background Script needed to maintain popup and content scripts */

//set all streaming sites to subscribed
let prime_video = true;
let disney_plus = true;
let crave = true;

//stores the default settings using the storage API when extension is downloaded
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({prime_video});
    chrome.storage.sync.set({disney_plus});
    chrome.storage.sync.set({crave});

    console.log(`Prime Video subscription set to ${prime_video}.\n`);
    console.log(`Disney Plus subcription set to ${disney_plus}.\n`);
    console.log(`Crave subcription set to ${crave}.\n`);
});

//stores info on the current movie being found
let movie = {
    movie_found : false,
    movie_url : "",
    movie_title : "",
    movie_site : "", 
    movie_image : ""
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set(movie);

    console.log(`Movie info initialized.\n`);
})
