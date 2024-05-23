const types = {
  none: {
    strong: [],
    weak: [],
    immune: [],
    url: "../imgs/icons/Empty.png",
  },
  normal: {
    strong: [],
    weak: ["rock", "steel"],
    immune: ["ghost"],
    url: "//archives.bulbagarden.net/media/upload/thumb/a/ae/Normal_icon.png/20px-Normal_icon.png",
  },
  fire: {
    strong: ["grass", "ice", "bug", "steel"],
    weak: ["fire", "water", "rock", "dragon"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/5/5e/Fire_icon.png/20px-Fire_icon.png",
  },
  water: {
    strong: ["fire", "ground", "rock"],
    weak: ["water", "grass", "dragon"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/7/7f/Water_icon.png/20px-Water_icon.png",
  },
  electric: {
    strong: ["water", "flying"],
    weak: ["electric", "grass", "dragon"],
    immune: ["ground"],
    url: "//archives.bulbagarden.net/media/upload/thumb/a/af/Electric_icon.png/20px-Electric_icon.png",
  },
  grass: {
    strong: ["water", "ground", "rock"],
    weak: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/c/cb/Grass_icon.png/20px-Grass_icon.png",
  },
  ice: {
    strong: ["grass", "ground", "flying", "dragon"],
    weak: ["fire", "water", "ice", "steel"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/8/83/Ice_icon.png/20px-Ice_icon.png",
  },
  fighting: {
    strong: ["normal", "ice", "rock", "dark", "steel"],
    weak: ["poison", "flying", "psychic", "bug", "fairy"],
    immune: ["ghost"],
    url: "//archives.bulbagarden.net/media/upload/thumb/7/7d/Fighting_icon.png/20px-Fighting_icon.png",
  },
  poison: {
    strong: ["grass", "fairy"],
    weak: ["poison", "ground", "rock", "ghost"],
    immune: ["steel"],
    url: "//archives.bulbagarden.net/media/upload/thumb/8/84/Poison_icon.png/20px-Poison_icon.png",
  },
  ground: {
    strong: ["fire", "electric", "poison", "rock", "steel"],
    weak: ["grass", "bug"],
    immune: ["flying"],
    url: "//archives.bulbagarden.net/media/upload/thumb/5/58/Ground_icon.png/20px-Ground_icon.png",
  },
  flying: {
    strong: ["grass", "fighting", "bug"],
    weak: ["electric", "rock", "steel"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/f/f0/Flying_icon.png/20px-Flying_icon.png",
  },
  psychic: {
    strong: ["fighting", "poison"],
    weak: ["psychic", "steel"],
    immune: ["dark"],
    url: "//archives.bulbagarden.net/media/upload/thumb/a/a6/Psychic_icon.png/20px-Psychic_icon.png",
  },
  bug: {
    strong: ["grass", "psychic", "dark"],
    weak: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/7/79/Bug_icon.png/20px-Bug_icon.png",
  },
  rock: {
    strong: ["fire", "ice", "flying", "bug"],
    weak: ["fighting", "ground", "steel"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/f/ff/Rock_icon.png/20px-Rock_icon.png",
  },
  ghost: {
    strong: ["psychic", "ghost"],
    weak: ["dark"],
    immune: ["normal"],
    url: "//archives.bulbagarden.net/media/upload/thumb/8/82/Ghost_icon.png/20px-Ghost_icon.png",
  },
  dragon: {
    strong: ["dragon"],
    weak: ["steel"],
    immune: ["fairy"],
    url: "//archives.bulbagarden.net/media/upload/thumb/9/91/Dragon_icon.png/20px-Dragon_icon.png",
  },
  dark: {
    strong: ["psychic", "ghost"],
    weak: ["fighting", "dark", "fairy"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/3/33/Dark_icon.png/20px-Dark_icon.png",
  },
  steel: {
    strong: ["ice", "rock", "fairy"],
    weak: ["fire", "water", "electric", "steel"],
    immune: ["poison"],
    url: "//archives.bulbagarden.net/media/upload/thumb/b/b8/Steel_icon.png/20px-Steel_icon.png",
  },
  fairy: {
    strong: ["fighting", "dragon", "dark"],
    weak: ["fire", "poison", "steel"],
    immune: [],
    url: "//archives.bulbagarden.net/media/upload/thumb/5/5a/Fairy_icon.png/20px-Fairy_icon.png",
  },
};

for (const type in types) {
  if (type !== "none") {
    types[type].url = `../imgs/icons/${type}.svg`; // Update URL to use SVG image
  }
}

console.log(types);

let default_display;
let pokeAPI = "https://pokeapi.co/api/v2/";
let coin = 0;
let type1 = "none";
let type2 = "none";
let pokemonCache = {};
let onHandPokemon;
let selectedTeamSlot;
let myTeam = [];
let enemyTeam = [];

function nowCached() {
  console.log("now cached: ", pokemonCache);
}

// Function to redirect to the PvP calculator page with team data as URL parameters
function redirectToPvPCalculator() {
  const myTeamString = JSON.stringify(myTeam);
  const enemyTeamString = JSON.stringify(enemyTeam);
  const queryString = `?myTeam=${encodeURIComponent(
    myTeamString
  )}&enemyTeam=${encodeURIComponent(enemyTeamString)}`;
  const pvpLink = document.getElementById("pvpLink");
  pvpLink.href = `pvpcalculator.html${queryString}`;

  localStorage.setItem("myTeam", myTeamString);
  localStorage.setItem("enemyTeam", enemyTeamString);
}

// Function to add pokemon to the team
async function addToTeam(teamName) {
  try {
    const teamTable = document.querySelector(`.${teamName} table`);
    const emptyRow = teamTable.querySelector("th:empty");
    if (emptyRow) {
      const rowCell = document.createElement("div");
      rowCell.classList.add("row-cell");
      const img = document.createElement("img");
      img.src = pokemonCache[onHandPokemon].imgURL;
      const span = document.createElement("span");
      span.innerHTML = onHandPokemon;

      const typesContainer = document.createElement("div");
      typesContainer.classList.add("types-container");

      // Iterate over each type of the Pokémon
      pokemonCache[onHandPokemon].type.forEach((type) => {
        // Create image element for the type

        const cont = document.createElement("div");
        cont.classList.add("cont");
        cont.classList.add(`type-${type}`);
        const typeImg = document.createElement("img");
        typeImg.src = `../imgs/icons/${type}.svg`; // Replace 'path_to_type_image' with the actual path to your type images
        typeImg.alt = type;
        typeImg.classList.add("type-img");

        // Append type image to typesContainer
        cont.appendChild(typeImg);
        typesContainer.appendChild(cont);
      });

      rowCell.appendChild(img);
      rowCell.appendChild(typesContainer);
      // rowCell.appendChild(span);
      emptyRow.appendChild(rowCell);

      if (teamName === "myteam") {
        myTeam.push(onHandPokemon);
      } else if (teamName === "enemy") {
        enemyTeam.push(onHandPokemon);
      }
      localStorage.setItem("pokemonCache", JSON.stringify(pokemonCache));
      localStorage.setItem("types", JSON.stringify(types));
      redirectToPvPCalculator();
    } else if (
      selectedTeamSlot &&
      selectedTeamSlot.classList[0] == teamName.substring(0, 2)
    ) {
      let index = selectedTeamSlot.classList[1].substring(5);
      if (teamName === "myteam") {
        myTeam[index] = onHandPokemon;
      } else if (teamName === "enemy") {
        enemyTeam[index] = onHandPokemon;
      }
      redirectToPvPCalculator();

      selectedTeamSlot.innerHTML = "";
      const rowCell = document.createElement("div");
      rowCell.classList.add("row-cell");
      const img = document.createElement("img");
      img.src = pokemonCache[onHandPokemon].imgURL;
      const span = document.createElement("span");
      span.innerHTML = onHandPokemon;

      const typesContainer = document.createElement("div");
      typesContainer.classList.add("types-container");

      // Iterate over each type of the Pokémon
      pokemonCache[onHandPokemon].type.forEach((type) => {
        // Create image element for the type

        const cont = document.createElement("div");
        cont.classList.add("cont");
        cont.classList.add(`type-${type}`);
        const typeImg = document.createElement("img");
        typeImg.src = `../imgs/icons/${type}.svg`; // Replace 'path_to_type_image' with the actual path to your type images
        typeImg.alt = type;
        typeImg.classList.add("type-img");

        // Append type image to typesContainer
        cont.appendChild(typeImg);
        typesContainer.appendChild(cont);
      });

      rowCell.appendChild(img);
      rowCell.appendChild(typesContainer);
      // rowCell.appendChild(span);
      selectedTeamSlot.appendChild(rowCell);
      localStorage.setItem("pokemonCache", JSON.stringify(pokemonCache));
    } else {
      console.log("Team is full!"); // Display a message if the team is full
    }
  } catch (err) {
    console.log(err);
    alert("No Pokemon is selected yet");
  }
}

document.querySelectorAll(".myteam th, .enemy th").forEach((slot) => {
  slot.addEventListener("click", () => {
    document.querySelectorAll(".myteam th, .enemy th").forEach((s) => {
      s.classList.remove("selected");
    });
    selectedTeamSlot = slot;
    slot.classList.add("selected");
  });
});

function checkTeamAlreadyExist() {
  if (localStorage.getItem("pokemonCache")) {
    pokemonCache = JSON.parse(localStorage.getItem("pokemonCache"));
  } else {
    return;
  }
  if (localStorage.getItem("myTeam")) {
    const teamTable = document.querySelector(`.myteam table`);

    myTeam = JSON.parse(localStorage.getItem("myTeam"));

    myTeam.forEach((pokemon) => {
      const emptyRow = teamTable.querySelector("th:empty");
      if (emptyRow) {
        const rowCell = document.createElement("div");
        rowCell.classList.add("row-cell");
        const img = document.createElement("img");
        img.src = pokemonCache[pokemon].imgURL;
        const span = document.createElement("span");
        span.innerHTML = pokemon;

        const typesContainer = document.createElement("div");
        typesContainer.classList.add("types-container");

        // Iterate over each type of the Pokémon
        pokemonCache[pokemon].type.forEach((type) => {
          // Create image element for the type

          const cont = document.createElement("div");
          cont.classList.add("cont");
          cont.classList.add(`type-${type}`);
          const typeImg = document.createElement("img");
          typeImg.src = `../imgs/icons/${type}.svg`; // Replace 'path_to_type_image' with the actual path to your type images
          typeImg.alt = type;
          typeImg.classList.add("type-img");

          // Append type image to typesContainer
          cont.appendChild(typeImg);
          typesContainer.appendChild(cont);
        });

        rowCell.appendChild(img);
        rowCell.appendChild(typesContainer);
        // rowCell.appendChild(span);
        emptyRow.appendChild(rowCell);
      }
    });
  }
  if (localStorage.getItem("enemyTeam")) {
    const teamTable = document.querySelector(`.enemy table`);

    enemyTeam = JSON.parse(localStorage.getItem("enemyTeam"));

    enemyTeam.forEach((pokemon) => {
      const emptyRow = teamTable.querySelector("th:empty");
      if (emptyRow) {
        const rowCell = document.createElement("div");
        rowCell.classList.add("row-cell");
        const img = document.createElement("img");
        img.src = pokemonCache[pokemon].imgURL;
        const span = document.createElement("span");
        span.innerHTML = pokemon;

        const typesContainer = document.createElement("div");
        typesContainer.classList.add("types-container");

        // Iterate over each type of the Pokémon
        pokemonCache[pokemon].type.forEach((type) => {
          // Create image element for the type

          const cont = document.createElement("div");
          cont.classList.add("cont");
          cont.classList.add(`type-${type}`);
          const typeImg = document.createElement("img");
          typeImg.src = `../imgs/icons/${type}.svg`; // Replace 'path_to_type_image' with the actual path to your type images
          typeImg.alt = type;
          typeImg.classList.add("type-img");

          // Append type image to typesContainer
          cont.appendChild(typeImg);
          typesContainer.appendChild(cont);
        });

        rowCell.appendChild(img);
        rowCell.appendChild(typesContainer);
        // rowCell.appendChild(span);
        emptyRow.appendChild(rowCell);
      }
    });
  }
}

addEventListener("DOMContentLoaded", () => {
  checkTeamAlreadyExist();

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
        if (type2) {
          getPokemonByType(type2);
        }
        return;
      } else if (this.value === type2) {
        selectedBtn2.classList.remove("selected2");
        type2 = "none";
        coin = 1;
        if (type1) {
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
    btn.addEventListener("dblclick", (event) => {
      resetTypes(btn.value);
    });
  });

  function resetTypes(type) {
    if (type == type1 || type == type2) {
      const selectedBtn1 = document.querySelector(
        ".type-selector table .selected1"
      );
      const selectedBtn2 = document.querySelector(
        ".type-selector table .selected2"
      );

      selectedBtn1.classList.remove("selected1");
      type1 = "none";
      selectedBtn2.classList.remove("selected2");
      type2 = "none";
      coin = 0;
    } else {
      return;
    }
  }

  async function filter(entries) {
    if (type1 !== "none" && type2 !== "none") {
      // If both type1 and type2 are selected, display only the Pokémon with these two types
      const selectedTypes = [type1, type2];

      // Fetch Pokémon data for each entry and then filter based on types
      await Promise.all(
        entries.map(async (entry) => {
          const pokemonName = entry.pokemon.name;
          await fetchPokemon(entry, pokemonName); // Fetch Pokémon data
        })
      );

      // Filter the entries based on selected types
      const filteredEntries = entries.filter((entry) => {
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

  function checkContainType(pokemon) {
    if (Object.keys(pokemon.type).length === 1) {
      return false;
    } else {
      // console.log(pokemon.type[0]);
      // console.log(`Type1: ${pokemon.type[0].name}  Type2: ${pokemon.type[1].name}`);
    }
    if (pokemon.type[0] == type1 && pokemon.type[1] == type2) {
      return true;
    }
    if (pokemon.type[1] == type1 && pokemon.type[0] == type2) {
      return true;
    } else return false;
  }

  // Function to fetch Pokémon data by type from the API
  async function getPokemonByType(type) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      const pokemonEntries = data.pokemon;

      filter(pokemonEntries)
        .then((filteredEntries) => {
          console.log(filteredEntries); // Access the filtered entries data
          displayPokemon(filteredEntries); // Pass the filtered entries to the displayPokemon function
        })
        .catch((error) => {
          console.error("Error filtering Pokémon entries:", error);
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

        if (pokemonCache[name]) {
        } else {
          const stats = [
            { label: "HP", value: data.stats[0]["base_stat"] },
            { label: "Attack", value: data.stats[1]["base_stat"] },
            { label: "Defense", value: data.stats[2]["base_stat"] },
            { label: "Special Attack", value: data.stats[3]["base_stat"] },
            { label: "Special Defense", value: data.stats[4]["base_stat"] },
            { label: "Speed", value: data.stats[5]["base_stat"] },
          ];

          // Store data in cache
          pokemonCache[name] = {
            id: data.id,
            name: data.name,
            type: data.types,
            stats: stats, // Store stats in cache for later use
            imgURL: data.sprites.other["official-artwork"]["front_default"],
          };
        }

        onHandPokemon = data.name;

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

    console.log(`Current Data of ${data.name}`, data.stats);
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
    pokemonStrength.style = "width: 300px; height = 300;";

    // Create the table element
    // const table = document.createElement("table");

    const typesContainer = document.createElement("div");
    typesContainer.classList.add("types-container");

    // Iterate over each type of the Pokémon
    data.type.forEach((type) => {
      // Create image element for the type

      const cont = document.createElement("div");
      cont.classList.add("cont");
      cont.classList.add(`type-${type}`);
      const typeImg = document.createElement("img");
      typeImg.src = `../imgs/icons/${type}.svg`; // Replace 'path_to_type_image' with the actual path to your type images
      typeImg.alt = type;
      typeImg.classList.add("type-img");

      const typeName = document.createElement("span");
      typeName.innerHTML = type;

      // Append type image to typesContainer
      cont.appendChild(typeImg);
      cont.appendChild(typeName);
      typesContainer.appendChild(cont);
    });

    pokemonStrength.appendChild(typesContainer);
    // Create an array to hold the stats and their labels

    const canvas = document.createElement("canvas");
    canvas.id = "stats-chart";
    pokemonStrength.appendChild(canvas);

    // pokeDisplay.appendChild(pokemonElement);
    // pokeDisplay.appendChild(pokemonStrength);

    const labels = data.stats.map((stat) => stat.label + `\n ${stat.value}`);
    const dataValues = data.stats.map((stat) => stat.value);
    // Create a Chart.js radar chart
    new Chart(canvas, {
      type: "radar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Stats + Value",
            data: dataValues,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            borderColor: "rgba(255, 255, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          r: {
            pointLabels: {
              font: {
                size: 15,
              },
            },
            outerHeight: 400,
            outerWidth: 400,
            min: 0,
            max: 150,
            ticks: {
              stepSize: 30,
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.formattedValue; // Display label and value
            },
          },
        },
        formatter: function (value, context) {
          return context.chart.data.labels[context.value];
        },
      },
    });
    pokeDisplay.appendChild(pokemonElement);
    pokeDisplay.appendChild(pokemonStrength);
  }

  // function displayPokemonbyName(data) {
  //   const pokeDisplay = document.querySelector(".poke-display");
  //   pokeDisplay.innerHTML = ""; // Clear previous content

  //   const pokemonElement = document.createElement("div");
  //   pokemonElement.classList.add("pokemon");

  //   // Create image element
  //   const imgElement = document.createElement("img");
  //   imgElement.src = data.imgURL;
  //   imgElement.alt = data.name;
  //   imgElement.classList.add("searched");

  //   // Create info element
  //   const infoElement = document.createElement("div");
  //   infoElement.classList.add("info");
  //   infoElement.textContent = data.name;

  //   // Append image and info elements to pokemonElement
  //   pokemonElement.appendChild(imgElement);
  //   pokemonElement.appendChild(infoElement);

  //   // Create strength element
  //   const pokemonStrength = document.createElement("div");
  //   pokemonStrength.classList.add("strength");

  //   // Create the table element
  //   const table = document.createElement("table");

  //   // Create an array to hold the stats and their labels
  //   const stats = [
  //     { label: "HP", value: data.stats[0]["base_stat"] },
  //     { label: "Attack", value: data.stats[1]["base_stat"] },
  //     { label: "Defense", value: data.stats[2]["base_stat"] },
  //     { label: "Special Attack", value: data.stats[3]["base_stat"] },
  //     { label: "Special Defense", value: data.stats[4]["base_stat"] },
  //     { label: "Speed", value: data.stats[5]["base_stat"] },
  //   ];

  //   // Create table rows and cells for each stat
  //   stats.forEach((stat) => {
  //     const row = document.createElement("tr");
  //     const labelCell = document.createElement("td");
  //     const valueCell = document.createElement("td");

  //     labelCell.textContent = stat.label;
  //     valueCell.textContent = stat.value;

  //     row.appendChild(labelCell);
  //     row.appendChild(valueCell);

  //     table.appendChild(row);
  //   });

  //   // Calculate total strength
  //   const totalStrength = data.stats.reduce(
  //     (acc, curr) => acc + curr.base_stat,
  //     0
  //   );
  //   const totalRow = document.createElement("tr");
  //   const totalLabelCell = document.createElement("td");
  //   const totalValueCell = document.createElement("td");

  //   totalLabelCell.textContent = "Total Strength";
  //   totalValueCell.textContent = totalStrength;

  //   totalRow.appendChild(totalLabelCell);
  //   totalRow.appendChild(totalValueCell);

  //   table.appendChild(totalRow);

  //   // Append the table to the strength element
  //   pokemonStrength.appendChild(table);

  //   // Append pokemonElement and strength element to the display
  //   pokeDisplay.appendChild(pokemonElement);
  //   pokeDisplay.appendChild(pokemonStrength);
  // }

  async function fetchPokemon(entry, pokemonName) {
    if (pokemonCache[pokemonName]) {
      return;
    }
    try {
      const response = await fetch(entry.pokemon.url); // Fetch Pokémon data
      const data = await response.json();

      let imageURL;
      imageURL = data.sprites.other["official-artwork"]["front_default"]; // Extract imageURL from fetched data

      let temp = data.stats[3];
      data.stats[3] = data.stats[5];
      data.stats[5] = temp;

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

        let hoverTimeout; // Variable to hold the timeout

        // Event listtener for click
        pokemonElement.addEventListener("click", function (event) {
          const searchBar = document.getElementById("input-pokemon");
          searchBar.value = pokemonName;
          onHandPokemon = pokemonName;
        });

        // Add event listener for hover
        pokemonElement.addEventListener("mouseenter", function (event) {
          // Set a timeout to show the side display after 500 milliseconds (adjust as needed)
          hoverTimeout = setTimeout(() => {
            // Create and position side display
            console.log(`Hovering ${pokemonName}`);

            const sideDisplay = document.createElement("div");
            sideDisplay.classList.add("side-display");
            // sideDisplay.textContent = pokemonName;
            // Position side display next to the hovered Pokémon
            sideDisplay.style.left =
              425 +
              pokemonElement.getBoundingClientRect().right -
              pokeDisplay.getBoundingClientRect().left +
              "px";
            sideDisplay.style.top =
              70 +
              pokemonElement.getBoundingClientRect().top -
              pokeDisplay.getBoundingClientRect().top +
              "px";
            sideDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            sideDisplay.style.color = "white";
            sideDisplay.style.border = "1px white";
            sideDisplay.style.position = "absolute";

            // Create the table element
            const table = document.createElement("table");
            const stats = pokemonCache[pokemonName].stats;
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

            // Append the table to the strength element
            sideDisplay.appendChild(table);

            // Append side display to the pokeDisplay
            pokemonElement.appendChild(sideDisplay);
          }, 500);
        });

        pokemonElement.addEventListener("mouseleave", function (event) {
          // Clear the timeout when the mouse leaves the Pokémon element
          clearTimeout(hoverTimeout);
          // Remove side display if it's already shown
          const sideDisplay = document.querySelector(".side-display");
          if (sideDisplay) sideDisplay.remove();
        });

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
