

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
                    // Add card content using option data (e.g., option['name'], option['price'], etc.)
                    // Modify this part according to your card structure
                    // Example: menuOptionsHTML += '<h5>' + option['name'] + '</h5>';
                    menuOptionsHTML += '<p>' + option['option_name'] + '</p>';
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
});
