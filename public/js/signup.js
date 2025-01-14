document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loader = document.querySelector(".overlay");
    const errorModal = document.getElementById("error-modal");
    const heading = document.getElementById("modal-heading");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.getElementById("close-btn");  
     
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        function closeModal(){
            errorModal.style.display = "none";
         }
        closeBtn.addEventListener("click",closeModal)
        // Get input elements
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        // Get values from inputs
        const emailValue = email.value;
        const passwordValue = password.value;

        // Email regex pattern
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation
        if (!emailValue || !passwordValue) {
            // Apply red border to empty fields
            if (!emailValue) {
                email.style.borderBottom = "2px solid red";
            } else {
                email.style.borderBottom = "2px solid green";
            }
            if (!passwordValue) {
                password.style.borderBottom = "2px solid red";
            } else {
                password.style.borderBottom = "2px solid green";
            }

            return; // Exit form submission
        }

        if (!emailRegex.test(emailValue)) {
            // Apply red border to email if invalid
            email.style.borderBottom = "2px solid red";
            return; // Exit form submission if email is invalid
        } else {
            email.style.borderBottom = "2px solid green";
        }

        // Show loader while processing
        loader.style.display = "block";
        
        try {
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());
            console.log(data)
            // Example API call (replace '/your-login-endpoint' with actual URL)
            const response = await axios.post('http://localhost:3500/auth/signup', data);
            if (response.status === 200) {
                loader.style.display = "none";
                window.location.href = '/login';
            } else {
                // Handle failure here, if necessary
                loader.style.display = "none";
                
                // Set the custom error message
                const message = response.data?.message || "There was an issue with your signup attempt. Please try again.";
                
                // Assuming modalMessage and heading are elements that show the message and heading
                modalMessage.textContent = message;
                heading.textContent = "Error: Signup Failed";
                
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
            heading.textContent = "Error: Signup Failed";
            
            // Show the error modal
            errorModal.classList.remove("hidden");
        }
        
    });
});
