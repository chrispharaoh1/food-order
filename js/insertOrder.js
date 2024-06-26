document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('paynow').addEventListener('submit', function(e) {
        e.preventDefault();
        // Get local storage values
        var foodOption = localStorage.getItem('foodOption');
        var price = localStorage.getItem('price');
        var qty = localStorage.getItem('qty');

        // Set local storage values to hidden inputs
        document.getElementById('foodOption').value = foodOption;
        document.getElementById('price2').value = price;
        document.getElementById('qty2').value = qty;

        // AJAX request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../server/insertOrder.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // Show success modal
                    $('#successModal').modal('show');
                } else {
                    // Handle error
                    console.log(response.message);
                }
            }
        };
        //xhr.send(new URLSearchParams(new FormData(document.getElementById('paynow'))));
        xhr.send( JSON.stringify({ foodOption, price, qty}));
    });
});
