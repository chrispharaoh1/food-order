// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the logout button and logout confirmation modal
    const logoutButton = document.getElementById('logoutBtn');
    const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
  
    // Add click event listener to the logout button
    logoutButton.addEventListener('click', function() {
      // Show the logout confirmation modal
      logoutModal.show();
    });
  
    // Add click event listener to the confirm logout button inside the modal
    document.getElementById('confirmLogout').addEventListener('click', function() {

           // Perform logout action via AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../server/logout.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Redirect to home.html after successful logout
          window.location.href = '../login.html';
        } else {
          console.error('Error logging out:', xhr.responseText);
        }
      }
    };
    xhr.send();

      // Close the modalmodalCancel
      logoutModal.hide();
    });

      // Closing moddal
      document.getElementById('modalCancel').addEventListener('click', function() {

        logoutModal.hide();
      });
  });
  