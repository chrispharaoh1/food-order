// Function to populate food options based on selected category
function populateFoodOptions() {
    var selectedCategory = document.getElementById("foodCategory").value;
    var foodTypeSelect = document.getElementById("foodType");

    // Clear previous options and images
    foodTypeSelect.innerHTML = "<option value=''>Select</option>";
    var foodPicturesDiv = document.getElementById("foodPictures");
    foodPicturesDiv.innerHTML = "";

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

    if (selectedCategory !== "" && selectedFood !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../server/get_food_image.php?category=' + selectedCategory + '&food=' + selectedFood, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var imageData = JSON.parse(xhr.responseText);
                    if (imageData && imageData.image_url) {
                        var img = document.createElement("img");
                        img.src = imageData.image_url;
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
    }
}

// Event listeners
document.getElementById("foodCategory").addEventListener("change", populateFoodOptions);
document.getElementById("foodType").addEventListener("change", displayFoodPictures);
