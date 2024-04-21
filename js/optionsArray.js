document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch menu options and generate HTML cards
    function fetchMenuOptions() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../server/optionsArray.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Parse JSON response
                var menuOptions = JSON.parse(xhr.responseText);

                // Generate HTML cards
                var menuOptionsHTML = '';
                menuOptions.forEach(function(option) {
                    menuOptionsHTML += '<div class="row justify-content-center">';
                    menuOptionsHTML += '<div class="col-md-12 col-xl-10">';
                    menuOptionsHTML += '<div class="card shadow-0 border rounded-3">';
                    menuOptionsHTML += '<div class="card-body">';
                    menuOptionsHTML += '<div class="row">';

                    //Div for image
                    menuOptionsHTML += '<div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">';
                    menuOptionsHTML += '<div class="bg-image hover-zoom ripple rounded ripple-surface">';
                        //image
                        menuOptionsHTML += '<img src="../img/kate-aloo.jpeg" class="w-100">'+'</img>';
                    menuOptionsHTML += '</div>';
                    menuOptionsHTML += '</div>';

                    //Div for main content
                    menuOptionsHTML += '<div class="col-md-6 col-lg-6 col-xl-6">';
                        //title
                        menuOptionsHTML += '<h5>' + option['option_name'] + '</h5>';

                        //star rating
                        menuOptionsHTML += '<div class="d-flex flex-row">';
                        menuOptionsHTML += '<div class="text-danger mb-1 me-2">';
                            menuOptionsHTML += '<i class="fa fa-star">' + '</i>';
                            menuOptionsHTML += '<i class="fa fa-star">' + '</i>';
                            menuOptionsHTML += '<i class="fa fa-star">' + '</i>';
                            menuOptionsHTML += '<i class="fa fa-star">' + '</i>';
                        menuOptionsHTML += '</div>';
                        menuOptionsHTML += '</div>';

                        //Contents description
                        menuOptionsHTML += '<div class="mt-1 mb-0 text-muted small">';
                            menuOptionsHTML += '<label>' +'IIngridients : ' + option['ingredients']+ '</label>';
                        menuOptionsHTML += '</div>';
                        menuOptionsHTML += '</div>';
                        

                        //Price and shipping
                        menuOptionsHTML += '<div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">';
                            menuOptionsHTML += '<div class="d-flex flex-row align-items-center mb-1">';
                                menuOptionsHTML += '<h4 class="mb-1 me-1">' +'Price: $'  + option['price'] + '</4>';
                            menuOptionsHTML += '</div>';
                                 menuOptionsHTML += '<h6 class="text-success">' +'Free shipping' +'</h5>';

                                 //button for buy and login
                                 menuOptionsHTML += '<div class="d-flex flex-column mt-4">';
                                    menuOptionsHTML += '<button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-sm" type="button" onclick="redirectToPay(\'' + option['price'] + '\', \'' + option['option_name'] + '\')">Buy</button>';
                                 menuOptionsHTML += '</div>';

                        menuOptionsHTML += '</div>';

                    
                    menuOptionsHTML += '</div>';
                    menuOptionsHTML += '</div>';
                    menuOptionsHTML += '</div>';
                    menuOptionsHTML += '</div>';
                    menuOptionsHTML += '</div>';

                });

                // Insert generated HTML into DOM
                document.getElementById('menuItems').innerHTML = menuOptionsHTML;
            }
        };
        xhr.send();
    }

    // Call fetchMenuOptions function to load menu options when the page loads
    fetchMenuOptions();

    // Function to redirect to pay.html with price and ingredients as query parameters
 
});

function redirectToPay(price, option_name) {
    var url = 'pay.html?price=' + encodeURIComponent(price) + '&ingredients=' + encodeURIComponent(option_name);
    //setting the data to local storage to be retrieved at pay page
    localStorage.setItem("price", price);
    localStorage.setItem("foodOption", option_name);
    localStorage.setItem("qty", "Smith");
    localStorage.setItem("total", "Smith");
    localStorage.setItem("imageUrl", "Smith");
    window.location.href = url;
}
