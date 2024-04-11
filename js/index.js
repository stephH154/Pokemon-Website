const types = {
    normal: {
        strong: [],
        weak: ["rock", "steel"],
        immune: ["ghost"]
    },
    fire: {
        strong: ["grass", "ice", "bug", "steel"],
        weak: ["fire", "water", "rock", "dragon"],
        immune: []
    },
    water: {
        strong: ["fire", "ground", "rock"],
        weak: ["water", "grass", "dragon"],
        immune: []
    },
    electric: {
        strong: ["water", "flying"],
        weak: ["electric", "grass", "dragon"],
        immune: ["ground"]
    },
    grass: {
        strong: ["water", "ground", "rock"],
        weak: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
        immune: []
    },
    ice: {
        strong: ["grass", "ground", "flying", "dragon"],
        weak: ["fire", "water", "ice", "steel"],
        immune: []
    },
    fighting: {
        strong: ["normal", "ice", "rock", "dark", "steel"],
        weak: ["poison", "flying", "psychic", "bug", "fairy"],
        immune: ["ghost"]
    },
    poison: {
        strong: ["grass", "fairy"],
        weak: ["poison", "ground", "rock", "ghost"],
        immune: ["steel"]
    },
    ground: {
        strong: ["fire", "electric", "poison", "rock", "steel"],
        weak: ["grass", "bug"],
        immune: ["flying"]
    },
    flying: {
        strong: ["grass", "fighting", "bug"],
        weak: ["electric", "rock", "steel"],
        immune: []
    },
    psychic: {
        strong: ["fighting", "poison"],
        weak: ["psychic", "steel"],
        immune: ["dark"]
    },
    bug: {
        strong: ["grass", "psychic", "dark"],
        weak: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"],
        immune: []
    },
    rock: {
        strong: ["fire", "ice", "flying", "bug"],
        weak: ["fighting", "ground", "steel"],
        immune: []
    },
    ghost: {
        strong: ["psychic", "ghost"],
        weak: ["dark"],
        immune: ["normal"]
    },
    dragon: {
        strong: ["dragon"],
        weak: ["steel"],
        immune: ["fairy"]
    },
    dark: {
        strong: ["psychic", "ghost"],
        weak: ["fighting", "dark", "fairy"],
        immune: []
    },
    steel: {
        strong: ["ice", "rock", "fairy"],
        weak: ["fire", "water", "electric", "steel"],
        immune: ["poison"]
    },
    fairy: {
        strong: ["fighting", "dragon", "dark"],
        weak: ["fire", "poison", "steel"],
        immune: []
    }
};


addEventListener("DOMContentLoaded", () => {
  // Variables for effectiveness calculation
  
  let attk_type;
  let defs_type1;
  let defs_type2;

  // function for calculation

  function effectCal(atk, def1, def2){

  }
  const body = document.querySelector("body");

  body.addEventListener("click", function(event) {
      let effectness = 1;
      const eve = document.querySelector(".number");

      if(types[attk_type].strong.includes(defs_type1)){
        effectness*= 2;
      }
      else if(types[attk_type].weak.includes(defs_type1)){
        effectness*= 1/2;
      }
      else if(types[attk_type].immune.includes(defs_type1)){
        effectness*= 0;
      }

      if(types[attk_type].strong.includes(defs_type2)){
        effectness*= 2;
      }
      else if(types[attk_type].weak.includes(defs_type2)){
        effectness*= 1/2;
      }
      else if(types[attk_type].immune.includes(defs_type2)){
        effectness*= 0;
      }

      eve.innerHTML = effectness + "x";
  });


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
    });
  });

  const defense1 = document.getElementById("type1");
  const defense2 = document.getElementById("type2");

  

  defense1.addEventListener("change", function (event) {
    defs_type1 = defense1.value;
    console.log(defs_type1);
  });

  defense2.addEventListener("change", function (event) {
    defs_type2 = defense2.value;
    if(defs_type2 === defs_type1){
      defs_type2 = "none";
    }
    console.log(defs_type2);
  });

    
});

