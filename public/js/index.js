
  
  

// Hamburger menu toggle
document.getElementById('hamburger-menu').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
  });

 // Get the modal and the close button
 const modal = document.getElementById('tuition-modal');
 const closeModalButton = document.getElementById('close-modal');


 // Function to close the modal
 // Close modal on click
 closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

 // Close modal when clicking outside of the modal content
 window.addEventListener('click', function(event) {
     if (event.target === modal) {
         closeModal();
     }
 });

 //function open registration model
 function openRegistration(){
    modal.classList.remove('active');
 }
 function registerBtn(button) {
    const parentDiv = button.closest('div');
    const id = parentDiv.getAttribute('data-programme-id');
    const type = parentDiv.querySelector("h3").textContent;
  
    console.log(`Type: ${type}`);
    console.log(`ID: ${id}`);
  
    // Check and log each element if it exists
    if (parentDiv.querySelector(".price")) {
      const price = parentDiv.querySelector(".price").textContent;
      console.log(`Price: ${price}`);
    }
  
    if (parentDiv.querySelector(".date")) {
      const date = parentDiv.querySelector(".date").textContent;
      console.log(`Date: ${date}`);
    }
  
    if (parentDiv.querySelector(".registration")) {
      const registration = parentDiv.querySelector(".registration").textContent;
      console.log(`Registration: ${registration}`);
    }
  
    if (parentDiv.querySelector(".duration")) {
      const duration = parentDiv.querySelector(".duration").textContent;
      console.log(`Duration: ${duration}`);
    }
  
    // If none of the elements are found
    if (
      !parentDiv.querySelector(".price") &&
      !parentDiv.querySelector(".date") &&
      !parentDiv.querySelector(".registration") &&
      !parentDiv.querySelector(".duration")
    ) {
      console.log("Unable to find any elements in the selected div");
    }
 // Show modal
   modal.classList.remove('hidden');
   
  }

  
