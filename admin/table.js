document.addEventListener('DOMContentLoaded', function() {
    fetchMenuOptions();
  });
  
  function fetchMenuOptions() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_menu_options.php', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var menuOptions = JSON.parse(xhr.responseText);
          populateTable(menuOptions);
        } else {
          console.error('Failed to fetch menu options');
        }
      }
    };
    xhr.send();
  }
  
  function populateTable(menuOptions) {
    var tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';
  
    menuOptions.forEach(function(option) {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>${option.option_name}</td>
        <td>${option.category}</td>
        <td>$${option.price}</td>
        <td>
          <a href="#" class="edit" data-id="${option.option_id}"><i class="fa fa-edit" style="font-size:20px;color:black"></i></a> |
          <a href="#" class="delete" data-id="${option.option_id}"><i class="fa fa-trash" style="font-size:20px;color:black"></i></a>
        </td>
      `;
      tableBody.appendChild(row);
    });
  
    // Add event listeners for edit and delete actions
    var editButtons = document.querySelectorAll('.edit');
    editButtons.forEach(function(button) {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        var optionId = this.getAttribute('data-id');
        // Implement edit action
        populateEditModal(optionId);
      });
    });
  
    var deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(function(button) {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        var optionId = this.getAttribute('data-id');
        deleteMenuOption(optionId);
      });
    });
  }
  
  
  //function for deleting a row
  function deleteMenuOption(optionId) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete_menu_option.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            fetchMenuOptions(); // Refresh table after deletion
          } else {
            console.error('Failed to delete menu option');
          }
        } else {
          console.error('Failed to delete menu option');
        }
      }
    };
    xhr.send('optionId=' + encodeURIComponent(optionId));
  }

  // Function to populate the edit modal with data for a specific optionId
function populateEditModal(optionId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_menu_options.php?optionId=' + optionId, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var optionData = JSON.parse(xhr.responseText);
          // Populate modal fields with optionData
          document.getElementById('editName').value = optionData.option_name;
          document.getElementById('editCategory').value = optionData.category;
          document.getElementById('editPrice').value = optionData.price;
          // Show the modal
          var modal = document.getElementById('editModal');
          modal.style.display = 'block';
        } else {
          console.error('Failed to fetch menu option data');
        }
      }
    };
    xhr.send();
  }
  