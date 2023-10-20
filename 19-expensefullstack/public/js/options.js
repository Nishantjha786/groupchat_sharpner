
// Get references to the dropdowns
const descriptionDropdown = document.getElementById("description");
const categoryDropdown = document.getElementById("category");

// Define the options for each description
const descriptionOptions = {
    Food: ["Breakfast", "Lunch", "Dinner"],
    Travel: ["Official", "Personal"],
    Fuel: ["Official", "Personal"]
};

// Function to update the category dropdown based on the selected description
function updateCategoryOptions() {
    const selectedDescription = descriptionDropdown.value;
    const categoryOptions = descriptionOptions[selectedDescription] || [];
    
    // Clear existing options
    categoryDropdown.innerHTML = "";
    
    // Add new options
    for (const categoryOption of categoryOptions) {
        const optionElement = document.createElement("option");
        optionElement.value = categoryOption;
        optionElement.textContent = categoryOption;
        categoryDropdown.appendChild(optionElement);
    }
}

// Add an event listener to the description dropdown
descriptionDropdown.addEventListener("change", updateCategoryOptions);

// Initialize the category options based on the default selection
updateCategoryOptions();
