document.getElementById('sign-up').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var fullName = document.getElementById('fullname').value.trim();
    var email = document.getElementById('email').value.trim();
    var actionBox = document.getElementById('actionBox');
    var actionMessage = document.getElementById('actionMessage');

    // Reset action box
    actionBox.classList.remove('show');
    actionMessage.textContent = '';

    // Check if full name is empty
    if (fullName === '') {
        actionMessage.textContent = 'ERROR: Please enter your full name';
        actionBox.classList.add('show');
        return;
    }

    // Check if email is empty
    if (email === '') {
        actionMessage.textContent = 'ERROR: Please enter your email address';
        actionBox.classList.add('show');
        return;
    }

    // Check if email is valid
    if (!isValidEmail(email)) {
        actionMessage.textContent = 'ERROR: Please enter a valid email address';
        actionBox.classList.add('show');
        return;
    }

    // Display success message
    actionMessage.textContent = 'Form submitted successfully!';
    actionBox.classList.add('show');
});

// Function to validate email address
function isValidEmail(email) {
    // This regex pattern checks for a basic email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
