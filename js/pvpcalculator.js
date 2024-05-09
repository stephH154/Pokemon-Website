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

let myCurrentPokemon;

// Now you have the 'myTeam' and 'enemyTeam' arrays available for use
console.log(myTeam, enemyTeam);

const retrievedPokemonCache = JSON.parse(localStorage.getItem("pokemonCache"));
const types = JSON.parse(localStorage.getItem("types"));
console.log(types, retrievedPokemonCache);

// Function to display the selected Pokémon from myTeam
function displayMyTeam(index) {
  if (myTeam && myTeam.length > index) {
    const selectedPokemon = myTeam[index];
    myCurrentPokemon = selectedPokemon;
    const nameElement = document.querySelector(".current-member .name h4");
    const typesElement = document.querySelector(".current-member .types");
    const imgElement = document.querySelector(".current-member .image img");
    const statsElement = document.querySelector(".current-member .stats");
    if (nameElement) {
      nameElement.innerHTML =
        selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1);
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
    if (statsElement) {
      statsElement.innerHTML = "";
      const pokemonStrength = document.createElement("div");
      pokemonStrength.classList.add("strength");

      // Create the table element
      const table = document.createElement("table");
      let stats = retrievedPokemonCache[selectedPokemon].stats;
      let temp = stats[5];
      stats[5] = stats[3];
      stats[3] = temp;

      // Create table rows and cells for each stat
      stats.forEach((stat) => {
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

function displayResult(){
  if (myCurrentPokemon) {
    const mySpeed = retrievedPokemonCache[myCurrentPokemon].stats[5].value;

    const enemySpeeds = enemyTeam.map(enemyPokemon => {
      return retrievedPokemonCache[enemyPokemon].stats[5].value;
    });

    console.log(mySpeed, enemySpeeds);
    const targetDivs = document.querySelectorAll(".calculator .target");
    for(let i = 0; i < 3; i++){
      targetDivs[i].innerHTML = "";
      if(enemyTeam[i]){
        const targetspan = document.createElement("span");
        if(mySpeed > enemySpeeds[i]){
          targetspan.innerHTML = "Faster";
        }
        else if(mySpeed < enemySpeeds[i]){
          targetspan.innerHTML = "Slower";
        }
        else{
          targetspan.innerHTML = "50 50";
        }

        targetDivs[i].appendChild(targetspan);
      }
    }

    


  } else {
    console.log("No Pokémon selected from your team.");
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
  const enemyTeamTabIMG = document.querySelectorAll(".enemy-team .image img");
  const typesElement = document.querySelectorAll(
    ".enemy-team .enemy-member .type-star"
  );
  if (enemyTeam) {
    enemyTeam.forEach((pokemonName, index) => {
      if (pokemonName) {
        enemyTeamTabIMG[index].src = retrievedPokemonCache[pokemonName].imgURL;

        if (typesElement[index]) {
          typesElement[index].innerHTML = "";
          const typesContainer = document.createElement("div");
          typesContainer.classList.add("types-container");

          // Iterate over each type of the Pokémon
          retrievedPokemonCache[pokemonName].type.forEach((type) => {
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
            typesElement[index].append(typesContainer);
          });

          const stalBox = document.createElement("div");
          const stalIMG = document.createElement("img");
          stalIMG.src = "../imgs/icons/terastal.png";
          const stal = document.createElement("input");
          stal.setAttribute("type", "checkbox");
          stalBox.appendChild(stalIMG);
          stalBox.appendChild(stal);
          stalBox.classList.add("stal-box");
          typesElement[index].appendChild(stalBox);
        }
      } else {
        console.log(`Enemy member ${index + 1} not exist`);
      }
    });
  }
});

function recordType(index, type) {
  console.log(index);
  replaceSelectedBox(type, types[type].url, index)
}

function replaceSelectedBox(typeName, imageUrl, index){
  const selectedBox = document.getElementById(`dc-btn${index}`);
  const selectedTypeImg = document.getElementById(`dc-img${index}`);
  const selectedTypeName = document.getElementById(`dc-name${index}`);

  if (selectedBox.classList.length > 1) {
    selectedBox.classList.remove(selectedBox.classList[1]);
  }

  selectedTypeImg.src = imageUrl;
  selectedTypeImg.alt = `${typeName} icon.png`;
  if(typeName != 'none'){
    selectedTypeName.style="color: white";
  }
  else{
    selectedTypeName.style="color: black";
  }
  selectedBox.classList.add(`type-${typeName}`);
  // console.log(selectedBox);

  // Update the type name text
  selectedTypeName.textContent = typeName;
}