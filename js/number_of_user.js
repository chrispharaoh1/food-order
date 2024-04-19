   // Function to fetch the number of active customers
   function fetchCustomerCount() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../server/get_customer_count.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var customerCount = JSON.parse(xhr.responseText);
                updateCustomerCount(customerCount);
            } else {
                console.error('Failed to fetch customer count');
            }
        }
    };
    xhr.send();
}

// Function to update the customer count in the card
function updateCustomerCount(count) {
    var countElement = document.getElementById('customerCount');
    countElement.textContent = count;
}

// Fetch customer count when the page loads
fetchCustomerCount();