document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loader = document.querySelector(".overlay");
    const errorModal = document.getElementById("error-modal");
    const heading = document.getElementById("modal-heading");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.getElementById("close-btn");  
     
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
      
        // Get input elements
        const phone = document.getElementById("phone");
        const password = document.getElementById("password");

        // Get values from inputs
        const phoneValue = phone.value.trim();
        const passwordValue = password.value;
    
        // Function to close the modal and reset the form
        function closeModal() {
            // Hide the error modal
            errorModal.style.display = "none";
            
            // Clear the input fields
            email.value = "";
            password.value = "";
        }
        closeBtn.addEventListener("click",closeModal)
        // phone regex pattern
        const phoneRegex = /^[0-9]{10,15}$/; // Example phone number regex (adjust as needed)

        // Validation
        if (!phoneValue || !passwordValue) {
            // Apply red border to empty fields
            if (!phoneValue) {
                phone.style.borderBottom = "2px solid red";
            } else {
                phone.style.borderBottom = "2px solid green";
            }
            if (!passwordValue) {
                password.style.borderBottom = "2px solid red";
            } else {
                password.style.borderBottom = "2px solid green";
            }

            return; // Exit form submission
        }

    // Validate phone number format (with optional country code)
    if (!phoneRegex.test(phoneValue)) {
        // Apply red border if the phone number is invalid format
        phone.style.borderBottom = "2px solid red";
        return; // Exit form submission if phone number is invalid format
    }

    // Check if the length of the phone number (excluding country code) is at least 10 digits
    const digitsOnly = phoneValue.replace(/\D/g, ""); // Remove non-digit characters
    if (digitsOnly.length < 10) {
        // Apply red border if the phone number is too short
        phone.style.borderBottom = "2px solid red";
        return; // Exit form submission if phone number length is less than 10 digits
    }

    // Apply green border if the phone number is valid format and length
    phone.style.borderBottom = "2px solid green";



        // Show loader while processing
        loader.style.display = "block";
        
        try {
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());
             console.log(data)
            // Example API call (replace '/your-login-endpoint' with actual URL)
            const response = await axios.post('http://localhost:3500/auth/login', data);
            if (response.status === 201) {
                loader.style.display = "none";
                console.log(response.data);
                if(!response.data.token){
                    alert('Invalid credentials')
                }else{
                    localStorage.setItem('token', response.data.token);
                    window.location.href = '/';
                }
              
            } else {
                // Handle failure here, if necessary
                loader.style.display = "none";
                
                // Set the custom error message
                const message = response.data?.message || "There was an issue with your login attempt. Please try again.";
                
                // Assuming modalMessage and heading are elements that show the message and heading
                modalMessage.textContent = message;
                heading.textContent = "Error: Login Failed";
                
                // Show the modal
                errorModal.classList.remove("hidden");
            }
            
        } catch (error) {
            console.error("An error occurred while processing your request", error.message);
            loader.style.display = "none";
            
            // Set the error message in the modal
            const message = error.message || "An unexpected error occurred. Please try again later.";
            
            // Assuming modalMessage and heading are elements that show the message and heading
            modalMessage.textContent = message;
            heading.textContent = "Error: Login Failed";
            
            signupForm.reset();
            // Show the error modal
            errorModal.classList.remove("hidden");
        }
        
    })
})

//registration 
const studentName = 
