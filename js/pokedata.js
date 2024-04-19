let default_display;
let pokeAPI = "https://pokeapi.co/api/v2/";
let coin = 0;
let type1 = 'none';
let type2 = 'none';
const pokemonCache = {};

fetch(`${pokeAPI}pokemon?limit=20&offset=0`)
  .then((response) => response.json())
  .then((data) => {
    default_display = data;
    console.log(default_display.results);
  });

function nowCached() {
  console.log("now cached: ", pokemonCache);
}

addEventListener("DOMContentLoaded", () => {
  const type_sel = document.querySelectorAll(".type-selector table button");

  type_sel.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const selectedBtn1 = document.querySelector(
        ".type-selector table .selected1"
      );
      const selectedBtn2 = document.querySelector(
        ".type-selector table .selected2"
      );
      // if(selectedBtn.length >= 2){
      //     if(!coin){
      //         selectedBtn[0].classList.remove("selected");
      //     }
      //     else{
      //         selectedBtn[1].classList.remove("selected");
      //     }
      // }
      if (this.value === type1) {
        selectedBtn1.classList.remove("selected1");
        type1 = "none";
        coin = 0;
        if(type2){
          getPokemonByType(type2);
        }
        return;
      } else if (this.value === type2) {
        selectedBtn2.classList.remove("selected2");
        type2 = "none";
        coin = 1;
        if(type1){
          getPokemonByType(type1);
        }
        return;
      } else {
        if (selectedBtn1 != null && selectedBtn2 != null) {
          if (!coin) {
            selectedBtn1.classList.remove("selected1");
          } else {
            selectedBtn2.classList.remove("selected2");
          }
        }

        if (!coin) {
          this.classList.add("selected1");
          type1 = this.value;
          console.log(type1);
        } else {
          this.classList.add("selected2");
          type2 = this.value;
          console.log(type2);
        }
        getPokemonByType(this.value);
        coin = !coin;
      }
    });
  });

  async function filter(entries) {
    if (type1 !== 'none' && type2 !== 'none') {
        // If both type1 and type2 are selected, display only the Pokémon with these two types
        const selectedTypes = [type1, type2];
        
        // Fetch Pokémon data for each entry and then filter based on types
        await Promise.all(entries.map(async (entry) => {
            const pokemonName = entry.pokemon.name;
            await fetchPokemon(entry, pokemonName); // Fetch Pokémon data
        }));

        // Filter the entries based on selected types
        const filteredEntries = entries.filter(entry => {
          const pokemon = pokemonCache[entry.pokemon.name];
          // console.log(`${pokemon.name}: contains? ${checkContainType(pokemon)}`);
          return checkContainType(pokemon);
      });

        return filteredEntries;
    } else {
        // If no types are selected, return all entries
        return entries;
    }
}

  function checkContainType(pokemon){
    if(Object.keys(pokemon.type).length === 1){
      return false;
    }
    else{
      // console.log(pokemon.type[0]);
      // console.log(`Type1: ${pokemon.type[0].name}  Type2: ${pokemon.type[1].name}`);
    }
    if(pokemon.type[0] == type1 && pokemon.type[1] == type2){
      return true;
    }
    if(pokemon.type[1] == type1 && pokemon.type[0] == type2){
      return true;
    }
    else return false;

  }

  // Function to fetch Pokémon data by type from the API
  async function getPokemonByType(type) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      const pokemonEntries = data.pokemon;

      filter(pokemonEntries)
      .then(filteredEntries => {
        console.log(filteredEntries); // Access the filtered entries data
        displayPokemon(filteredEntries); // Pass the filtered entries to the displayPokemon function
      })
      .catch(error => {
        console.error('Error filtering Pokémon entries:', error);
      });
    
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  // async function getPokemonByName(name) {
  //   try {
  //     const response = await fetch(`${pokeAPI}pokemon/${name}`);
  //     const data = await response.json();
  //     console.log(data.sprites.other["official-artwork"]["front_default"]);

  //     const pokeDisplay = document.querySelector(".poke-display");
  //     pokeDisplay.innerHTML = ""; // Clear previous content

  //     const pokemonName = name;

  //     const pokemonElement = document.createElement("div");
  //     pokemonElement.classList.add("pokemon");

  //     // Create image element
  //     const imgElement = document.createElement("img");
  //     imgElement.src = data.sprites.other["official-artwork"]["front_default"];

  //     imgElement.alt = name;
  //     imgElement.classList.add("searched");

  //     // Create info element
  //     const infoElement = document.createElement("div");
  //     infoElement.classList.add("info");
  //     infoElement.textContent = pokemonName;

  //     // Append image and info elements to pokemonElement
  //     pokemonElement.appendChild(imgElement);
  //     pokemonElement.appendChild(infoElement);

  //     const pokemonStrength = document.createElement("div");
  //     pokemonStrength.classList.add("strength");

  //     // Create the table element
  //     const table = document.createElement("table");

  //     // Create an array to hold the stats and their labels
  //     const stats = [
  //       { label: "HP", value: data.stats[0]["base_stat"] },
  //       { label: "Attack", value: data.stats[1]["base_stat"] },
  //       { label: "Defense", value: data.stats[2]["base_stat"] },
  //       { label: "Special Attack", value: data.stats[3]["base_stat"] },
  //       { label: "Special Defense", value: data.stats[4]["base_stat"] },
  //       { label: "Speed", value: data.stats[5]["base_stat"] },
  //     ];

  //     // Create table rows and cells for each stat
  //     stats.forEach((stat) => {
  //       const row = document.createElement("tr");
  //       const labelCell = document.createElement("td");
  //       const valueCell = document.createElement("td");

  //       labelCell.textContent = stat.label;
  //       valueCell.textContent = stat.value;

  //       row.appendChild(labelCell);
  //       row.appendChild(valueCell);

  //       table.appendChild(row);
  //     });

  //     // Calculate total strength
  //     const totalStrength = data.stats.reduce(
  //       (acc, curr) => acc + curr.base_stat,
  //       0
  //     );
  //     const totalRow = document.createElement("tr");
  //     const totalLabelCell = document.createElement("td");
  //     const totalValueCell = document.createElement("td");

  //     totalLabelCell.textContent = "Total Strength";
  //     totalValueCell.textContent = totalStrength;

  //     totalRow.appendChild(totalLabelCell);
  //     totalRow.appendChild(totalValueCell);

  //     table.appendChild(totalRow);

  //     // Append the table to the container div
  //     pokemonStrength.appendChild(table);

  //     // Append pokemonElement to row
  //     pokeDisplay.appendChild(pokemonElement);
  //     pokeDisplay.appendChild(pokemonStrength);
  //   } catch (error) {
  //     console.error("Error fetching Pokémon data:", error);
  //   }
  // }
  async function getPokemonByName(name) {
    try {
      if (pokemonCache[name]) {
        console.log(`Retrived ${name} from cache`);
        // If Pokémon data is already in cache, use cached data
        const cachedData = pokemonCache[name];
        displayPokemonbyName(cachedData); // Display the Pokémon using cached data
      } else {
        // If Pokémon data is not in cache, fetch it from the API
        console.log(`Pulling data of ${name}`);
        const response = await fetch(`${pokeAPI}pokemon/${name}`);
        const data = await response.json();

        // Store data in cache
        pokemonCache[name] = {
          id: data.id,
          name: data.name,
          type: data.types,
          stats: data.stats, // Store stats in cache for later use
          imgURL: data.sprites.other["official-artwork"]["front_default"],
        };

        displayPokemonbyName(pokemonCache[name]); // Display the Pokémon using fetched data
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  function displayPokemonbyName(data) {
    const pokeDisplay = document.querySelector(".poke-display");
    pokeDisplay.innerHTML = ""; // Clear previous content

    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");

    // Create image element
    const imgElement = document.createElement("img");
    imgElement.src = data.imgURL;
    imgElement.alt = data.name;
    imgElement.classList.add("searched");

    // Create info element
    const infoElement = document.createElement("div");
    infoElement.classList.add("info");
    infoElement.textContent = data.name;

    // Append image and info elements to pokemonElement
    pokemonElement.appendChild(imgElement);
    pokemonElement.appendChild(infoElement);

    // Create strength element
    const pokemonStrength = document.createElement("div");
    pokemonStrength.classList.add("strength");

    // Create the table element
    const table = document.createElement("table");

    // Create an array to hold the stats and their labels
    const stats = [
      { label: "HP", value: data.stats[0]["base_stat"] },
      { label: "Attack", value: data.stats[1]["base_stat"] },
      { label: "Defense", value: data.stats[2]["base_stat"] },
      { label: "Special Attack", value: data.stats[3]["base_stat"] },
      { label: "Special Defense", value: data.stats[4]["base_stat"] },
      { label: "Speed", value: data.stats[5]["base_stat"] },
    ];

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

    // Calculate total strength
    const totalStrength = data.stats.reduce(
      (acc, curr) => acc + curr.base_stat,
      0
    );
    const totalRow = document.createElement("tr");
    const totalLabelCell = document.createElement("td");
    const totalValueCell = document.createElement("td");

    totalLabelCell.textContent = "Total Strength";
    totalValueCell.textContent = totalStrength;

    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(totalValueCell);

    table.appendChild(totalRow);

    // Append the table to the strength element
    pokemonStrength.appendChild(table);

    // Append pokemonElement and strength element to the display
    pokeDisplay.appendChild(pokemonElement);
    pokeDisplay.appendChild(pokemonStrength);
  }

  async function fetchPokemon(entry, pokemonName) {
    if (pokemonCache[pokemonName]) {
      return;
    }
    try {
      const response = await fetch(entry.pokemon.url); // Fetch Pokémon data
      const data = await response.json();

      let imageURL;
      imageURL = data.sprites.other["official-artwork"]["front_default"]; // Extract imageURL from fetched data

      // Store data in cache
      pokemonCache[pokemonName] = {
        id: data.id,
        name: data.name,
        type: data.types.map((typeEntry) => typeEntry.type.name), // Extract and store types
        stats: data.stats.map((statEntry) => ({
          label: statEntry.stat.name,
          value: statEntry.base_stat,
        })), // Extract and store stats
        imgURL: imageURL,
      };
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  function displayPokemon(pokemonEntries) {
    const pokeDisplay = document.querySelector(".poke-display");
    pokeDisplay.innerHTML = ""; // Clear previous content

    const numColumns = Math.ceil(pokemonEntries.length / 9);
    const numRows = 9;

    const item_container = document.createElement("div");
    item_container.classList.add("item-container");

    let counter = 0;
    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j < numColumns; j++) {
        const pokemonIndex = counter++;
        if (pokemonIndex >= pokemonEntries.length) break;

        const entry = pokemonEntries[pokemonIndex];
        const pokemonName = entry.pokemon.name;

        const pokemonElement = document.createElement("div");
        pokemonElement.classList.add("pokemon");

        // Create image element
        let imageURL = "";
        if (pokemonCache[pokemonName]) {
          imageURL = pokemonCache[pokemonName].imgURL; // Access imgURL from cached data
        } else {
          fetchPokemon(entry, pokemonName);
          imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            entry.pokemon.url.split("/")[6]
          }.png`;
        }

        const imgElement = document.createElement("img");
        imgElement.src = imageURL;
        imgElement.alt = pokemonName;

        // Create info element
        const infoElement = document.createElement("div");
        infoElement.classList.add("info");
        infoElement.textContent = pokemonName;

        // Append image and info elements to pokemonElement
        pokemonElement.appendChild(imgElement);
        pokemonElement.appendChild(infoElement);

        // Append pokemonElement to row
        row.appendChild(pokemonElement);
      }

      // Append row to pokeDisplay
      pokeDisplay.appendChild(row);
    }
  }

  const form = document.getElementById("pokemon-search-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the value from the input field
    const userInput = document.getElementById("input-pokemon").value;

    // Call your function to search for the specific Pokémon using the user input
    searchPokemon(userInput);
  });

  // Function to search for the specific Pokémon
  function searchPokemon(pokemonName) {
    console.log("Searching for Pokémon:", pokemonName);

    getPokemonByName(pokemonName);
  }
});
