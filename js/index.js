addEventListener("DOMContentLoaded", () => {
  // Get reference to the list
  const list = document.getElementById("attack-type");

  // Add click event listener to the list
  list.addEventListener("click", function (event) {
    // Check if clicked element is an <li> element
    if (event.target.tagName === "LI") {
      // Remove "selected" class from previously selected item (if any)
      const selectedItem = list.querySelector(".selected");
      if (selectedItem) {
        selectedItem.classList.remove("selected");
      }
      // Add "selected" class to the clicked item
      event.target.classList.add("selected");
      // Get the <span> tag inside the selected item
      const selectedSpan = event.target.querySelector("span");
      // Get the class name of the <span> tag
      const selectedSpanClassName = selectedSpan.className;
      // Split the class name by space to get individual classes
      const classes = selectedSpanClassName.split(" ");
      // Find the class name containing "type-"
      const typeClass = classes.find((className) =>
        className.startsWith("type-")
      );
      // Extract the part after "type-"
      const typeValue = typeClass.split("-")[1];
      // Log the extracted type value
      console.log("Selected type:", typeValue);
    }
  });
});
