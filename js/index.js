const types = {
  none:{
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

// Variables for effectiveness calculation
let attk_type = "normal";
let defs_type1;
let defs_type2;

function recordType(index, type) {
  if (index === 1) {
    defs_type1 = type;
  } else if (index === 2) {
    defs_type2 = type;
  }
  console.log(type);
  // console.log(types[type].url);
  replaceSelectedBox(type, types[type].url, index)
  // updateSelectedType(type, types[type].url, index);
  refreshEffectiveness();
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

function updateSelectedType(typeName, imageUrl, index) {
  // Get the container elements
  const selectedBox = document.querySelector(`#img${index} img`);
  const selectedTypeImg = document.getElementById(`img${index}`);
  const selectedTypeName = document.getElementById(`selectedType${index}`);


  // Update the image source and alt text and bg color
  if (selectedTypeImg.classList.length > 1) {
    selectedTypeImg.classList.remove(selectedTypeImg.classList[1]);
  }

  selectedBox.src = imageUrl;
  selectedBox.alt = `${typeName} icon.png`;
  selectedTypeImg.classList.add(`type-${typeName}`);

  // Update the type name text
  selectedTypeName.textContent = typeName;
}

function refreshEffectiveness() {
  let effectness = 1;
  const eve = document.querySelector(".number");

  if (types[attk_type].strong.includes(defs_type1)) {
    effectness *= 2;
  } else if (types[attk_type].weak.includes(defs_type1)) {
    effectness *= 1 / 2;
  } else if (types[attk_type].immune.includes(defs_type1)) {
    effectness *= 0;
  }

  if (types[attk_type].strong.includes(defs_type2)) {
    effectness *= 2;
  } else if (types[attk_type].weak.includes(defs_type2)) {
    effectness *= 1 / 2;
  } else if (types[attk_type].immune.includes(defs_type2)) {
    effectness *= 0;
  }

  eve.innerHTML = effectness + "x";
  const arrow = document.querySelector(".material-symbols-outlined");
  arrow.style = "color: rgb(123, 120, 120)";
  if(effectness != 1){
    if(effectness > 1){
      arrow.style = "color: red";
    }
    else if(effectness === 0){
      arrow.style = "color: lightgray";
    }
    else{
      arrow.style = "color: green";
    }
  }
}

addEventListener("DOMContentLoaded", () => {
  // function for calculation

  // const body = document.querySelectorAll("");

  // body.addEventListener("click", function (event) {});

  // Get reference to the list of spans
  const spanList = document.querySelectorAll("#attack-type li span");

  // Add click event listener to each span
  spanList.forEach((span) => {
    span.addEventListener("click", function (event) {
      // Remove "selected" class from previously selected span (if any)
      const selectedSpan = document.querySelector("#attack-type .selected");
      if (selectedSpan) {
        selectedSpan.classList.remove("selected");
      }
      // Add "selected" class to the clicked span
      this.classList.add("selected");
      // Get the value associated with the clicked span
      const selectedValue = this.dataset.value;
      // // Get the class name of the clicked span
      // const selectedSpanClassName = this.className;
      // // Split the class name by space to get individual classes
      // const classes = selectedSpanClassName.split(" ");
      // // Find the class name containing "type-"
      // const typeClass = classes.find((className) =>
      //   className.startsWith("type-")
      // );
      // // Extract the part after "type-"
      // const typeValue = typeClass.split("-")[1];
      // // Log the extracted type value
      // console.log("Selected type:", typeValue);
      // Return the selected value (you can do whatever you want with it)
      attk_type = selectedValue;
      console.log("Selected value:", selectedValue);
      updateSelectedType(attk_type, types[attk_type].url, 1);
      refreshEffectiveness();
    });
  });

  // const defense1 = document.getElementById("type1");
  // const defense2 = document.getElementById("type2");

  // defense1.addEventListener("change", function (event) {
  //   defs_type1 = defense1.value;
  //   console.log(defs_type1);
  //   refreshEffectiveness();
  // });

  // defense2.addEventListener("change", function (event) {
  //   defs_type2 = defense2.value;
  //   if (defs_type2 === defs_type1) {
  //     defs_type2 = "none";
  //   }
  //   console.log(defs_type2);
  //   refreshEffectiveness();
  // });
});
