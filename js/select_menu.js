// Function to populate food categories from the database
function populateFoodCategories() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../server/get_menu_options.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var categories = JSON.parse(xhr.responseText);
                var foodCategorySelect = document.getElementById("foodCategory");
                categories.forEach(category => {
                    var option = document.createElement("option");
                    option.value = category.menu_id; // Assuming menu_id is the value for categories
                    option.textContent = category.menu_name; // Assuming menu_name is the name for categories
                    foodCategorySelect.appendChild(option);
                });
            } else {
                console.error('Failed to fetch food categories');
            }
        }
    };
    xhr.send();
}

// Function to populate food options based on selected category
function populateFoodOptions() {
    var selectedCategory = document.getElementById("foodCategory").value;
    var foodTypeSelect = document.getElementById("foodType");

    // Clear previous options
    foodTypeSelect.innerHTML = "<option value=''>Select</option>";

    if (selectedCategory !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../server/options.php?menuId=' + selectedCategory, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var options = JSON.parse(xhr.responseText);
                    options.forEach(option => {
                        var optionElement = document.createElement("option");
                        optionElement.value = option.option_name;
                        optionElement.textContent = option.option_name;
                        foodTypeSelect.appendChild(optionElement);
                    });
                    // Enable food type select
                    foodTypeSelect.style.display = 'block';
                    foodTypeSelect.disabled = false;
                } else {
                    console.error('Failed to fetch food options');
                }
            }
        };
        xhr.send();
    } else {
        // Disable food type select if no category selected
        foodTypeSelect.disabled = true;
        // Hide food type select if no category selected
        foodTypeSelect.style.display = 'none';
    }
}



// Function to display food pictures
function displayFoodPictures() {
    var selectedCategory = document.getElementById("foodCategory").value;
    var selectedFood = document.getElementById("foodType").value;
    var foodPicturesDiv = document.getElementById("foodPictures");

    // Clear previous pictures
    foodPicturesDiv.innerHTML = "";

    if (selectedFood !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../server/get_food_image.php?category=' + selectedCategory + '&food=' + selectedFood, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var imageData = JSON.parse(xhr.responseText);
                    if (imageData && imageData.image_url) {
                        var img = document.createElement("img");
                        // img.src = imageData.image_url;
                        img.src = FRONT.PNG
                        img.alt = selectedFood;
                        img.className = "col-md-4";
                        foodPicturesDiv.appendChild(img);
                    }
                } else {
                    console.error('Failed to fetch food image');
                }
            }
        };
        xhr.send();

        // var img = document.createElement("img");
        // // img.src = imageData.image_url;
        // img.src = "FRONT.PNG";
        // img.alt = selectedFood;
        // img.className = "col-md-4";
        // foodPicturesDiv.appendChild(img);
    }
}

// Event listeners
document.getElementById("foodCategory").addEventListener("change", populateFoodOptions);
document.getElementById("foodType").addEventListener("change", displayFoodPictures);


// Call the function to populate food categories when the page loads
populateFoodCategories();
