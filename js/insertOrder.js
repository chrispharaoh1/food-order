document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-primary').addEventListener('click', function() {
        // Get local storage values
        var foodOption = localStorage.getItem('foodOption');
        var price = localStorage.getItem('price');
        var qty = localStorage.getItem('qty');

        // Set local storage values to hidden inputs
        document.getElementById('foodOption').value = foodOption;
        document.getElementById('price').value = price;
        document.getElementById('qty').value = qty;

        // AJAX request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'insertOrder.php', true);
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
        xhr.send(new URLSearchParams(new FormData(document.getElementById('paynow'))));
    });
});
