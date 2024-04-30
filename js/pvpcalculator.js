    // Get the query string from the URL
const queryString = window.location.search;

// Create a new URLSearchParams object with the query string
const urlParams = new URLSearchParams(queryString);

// Get the value of the 'myTeam' parameter
const myTeamParam = urlParams.get('myTeam');

// Get the value of the 'enemyTeam' parameter
const enemyTeamParam = urlParams.get('enemyTeam');

// Convert the JSON strings back to JavaScript objects
const myTeam = JSON.parse(decodeURIComponent(myTeamParam));
const enemyTeam = JSON.parse(decodeURIComponent(enemyTeamParam));

// Now you have the 'myTeam' and 'enemyTeam' arrays available for use
console.log(myTeam, enemyTeam);

const retrievedPokemonCache = JSON.parse(localStorage.getItem('pokemonCache'));
console.log(retrievedPokemonCache);


addEventListener("DOMContentLoaded", () => {
    
});