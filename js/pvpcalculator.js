// Get the query string from the URL
const queryString = window.location.search;

// Create a new URLSearchParams object with the query string
const urlParams = new URLSearchParams(queryString);

// Get the value of the 'myTeam' parameter
const myTeamParam = urlParams.get("myTeam");

// Get the value of the 'enemyTeam' parameter
const enemyTeamParam = urlParams.get("enemyTeam");

// Convert the JSON strings back to JavaScript objects
const myTeam = JSON.parse(decodeURIComponent(myTeamParam));
const enemyTeam = JSON.parse(decodeURIComponent(enemyTeamParam));

// Now you have the 'myTeam' and 'enemyTeam' arrays available for use
console.log(myTeam, enemyTeam);

const retrievedPokemonCache = JSON.parse(localStorage.getItem("pokemonCache"));
console.log(retrievedPokemonCache);

// Function to display the selected Pokémon from myTeam
function displayMyTeam(index) {
  if (myTeam && myTeam.length > index) {
    const selectedPokemon = myTeam[index];
    const nameElement = document.querySelector(".current-member .name h4");
    const typesElement = document.querySelector(".current-member .types");
    const imgElement = document.querySelector(".current-member .image img");
    const statsElement = document.querySelector(".current-member .stats")
    if (nameElement) {
      nameElement.innerHTML = selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1);;
    }
    if (typesElement) {
      typesElement.innerHTML = "";
      const typesContainer = document.createElement("div");
      typesContainer.classList.add("types-container");

      // Iterate over each type of the Pokémon
      retrievedPokemonCache[selectedPokemon].type.forEach((type) => {
        // Create image element for the type

        const cont = document.createElement("div");
        cont.classList.add("cont");
        cont.classList.add(`type-${type}`);
        const typeImg = document.createElement("img");
        typeImg.src = `../imgs/icons/${type}.svg`; // Replace 'path_to_type_image' with the actual path to your type images
        typeImg.alt = type;

        // Append type image to typesContainer
        cont.appendChild(typeImg);
        typesContainer.appendChild(cont);
        typesElement.append(typesContainer);
      });
    }
    if (imgElement) {
      imgElement.src = retrievedPokemonCache[selectedPokemon].imgURL;
      imgElement.alt = selectedPokemon;
    }
    if(statsElement) {
      statsElement.innerHTML = "";
      const pokemonStrength = document.createElement("div");
          pokemonStrength.classList.add("strength");
    
          // Create the table element
          const table = document.createElement("table");
    
    
          // Create table rows and cells for each stat
          retrievedPokemonCache[selectedPokemon].stats.forEach((stat) => {
            const row = document.createElement("tr");
            const labelCell = document.createElement("td");
            const valueCell = document.createElement("td");
    
            labelCell.textContent = stat.label;
            valueCell.textContent = stat.value;
    
            row.appendChild(labelCell);
            row.appendChild(valueCell);
    
            table.appendChild(row);
          });
    
          // Append the table to the container div
          pokemonStrength.appendChild(table);
          statsElement.appendChild(table);  
    }
  }
}

addEventListener("DOMContentLoaded", () => {
  const myTeamTabIMG = document.querySelectorAll(".select-member img");
  if (myTeam) {
    myTeam.forEach((pokemonName, index) => {
      if (pokemonName) {
        myTeamTabIMG[index].src = retrievedPokemonCache[pokemonName].imgURL;
      } else {
        console.log("unchoose slot");
      }
    });
  }

  
});
