addEventListener("DOMContentLoaded", () => {
  // Variables for effectiveness calculation
  let effectness = 5;
  let attk_type;
  let defs_type;

  // function for calculation
  const body = document.querySelector("body");

  body.addEventListener("change", function(event) {
      const eve = document.querySelector(".number");
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

  const defenseList = document.querySelectorAll(
    ".defense .defense-content .types"
  );

  defenseList.forEach((select) => {
    addEventListener("change", function (event) {
      defs_type = this.dataset.value;
    });
  });

  

});
