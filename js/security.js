document.addEventListener('DOMContentLoaded', function() {
    // Perform AJAX call to check sessions
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../server/security.php', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Sessions are set, do nothing
          console.log('Sessions are set.');
        } else if (xhr.status === 401) {
          // Sessions are not set, redirect to home.html
          const response = JSON.parse(xhr.responseText);
          const redirectUrl = response.redirect;
          window.location.href = "../"+redirectUrl;
        } else {
          // Error handling
          console.error('Error checking sessions:', xhr.responseText);
        }
      }
    };
    xhr.send();
  });
  