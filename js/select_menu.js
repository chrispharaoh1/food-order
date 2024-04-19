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
    var labelSelectDiv = document.getElementById("labelSelect");

    // Clear previous options
    foodTypeSelect.innerHTML = "<option value=''>Select</option>";
    labelSelectDiv.innerHTML = "";

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

                      //title text for select
                      var selectLabe = document.createElement("label");
                      selectLabe.textContent = "Select Food Type:";
                      labelSelectDiv.appendChild(selectLabe);

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
    var foodDiv = document.getElementById("foodT");
    var priceDiv = document.getElementById("price");
    var headingDiv = document.getElementById("heading");
    var qtyDiv = document.getElementById("qty");
    var buyDiv = document.getElementById("buy");
    

    // Clear previous elements
    foodPicturesDiv.innerHTML = ""; 
    foodDiv.innerHTML = "";
    priceDiv.innerHTML = "";
    headingDiv.innerHTML = "";
    qtyDiv.innerHTML = "";
    buyDiv.innerHTML = "";
    

    if (selectedFood !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../server/get_food_image.php?category=' + selectedCategory + '&food=' + selectedFood, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var imageData = JSON.parse(xhr.responseText);

                    //creating a picture tag
                        var img = document.createElement("img");
                        //Adding image source from the database
                        img.src = imageData.imageUrl;
                        img.alt = selectedFood;
                        img.className = "col-md-4";
                        //appending the image to the picture id to be displayed
                        foodPicturesDiv.appendChild(img); 
                        
                        //heading
                        var h4 = document.createElement("h4");
                        h4.textContent = selectedFood;
                        headingDiv.appendChild(h4);

                        //Food type
                        var label = document.createElement("label");
                        label.textContent = " "+selectedFood;
                        foodDiv.appendChild(label);

                         //Price
                         var price = document.createElement("label");
                         price.textContent = imageData.priceInDollars;
                         priceDiv.appendChild(price);

                        //Quantity
                        var qty = document.createElement("input");
                        qty.type = "number";
                        qty.style.width = "65px";
                        qty.value = "1";
                        qtyDiv.appendChild(qty);

                        //Order button
                        var buy = document.createElement("input");
                        buy.type = "button";
                        buy.value = "Buy now";
                        buyDiv.appendChild(buy);

                        //Enent listener for the button click
                        buy.addEventListener("click", function(){
                            localStorage.setItem("imageUrl", img.src); // Store value in localStorage
                            localStorage.setItem("foodOption", label.textContent); // Store value in localStorage
                            localStorage.setItem("price", price.textContent); // Store value in localStorage
                            localStorage.setItem("qty", qty.value); // Store value in localStorage                          
                            window.location.href = 'pay.html';
                        });


                        //displaying the block containing the peice and other infor
                        document.getElementById("product-info").style.display = 'block';

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
