document.addEventListener('DOMContentLoaded', () => {
    const signupTab = document.getElementById('signup-tab');
    const loginTab = document.getElementById('login-tab');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    signupTab.addEventListener('click', () => switchTab('signup'));
    loginTab.addEventListener('click', () => switchTab('login'));

    signupForm.addEventListener('submit', handleSignup);
    loginForm.addEventListener('submit', handleLogin);

    // Add input event listeners for real-time validation
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => validateField(input));
    });
});

function switchTab(tab) {
    const signupTab = document.getElementById('signup-tab');
    const loginTab = document.getElementById('login-tab');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (tab === 'signup') {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    } else {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    }
}

function handleSignup(event) {
    event.preventDefault();
    if (validateForm('signup-form')) {
        // Here you would typically send the data to your backend
        console.log('Signup successful');
        switchTab('login');
    }
}

function handleLogin(event) {
    event.preventDefault();
    if (validateForm('login-form')) {
        // Here you would typically send the data to your backend
        console.log('Login successful');
        // Redirect to dashboard or show success message
    }
}

function validateField(input) {
    let errorMessage = '';
    const value = input.value.trim();

    switch (input.name) {
        case 'name':
            if (value.length < 3) errorMessage = 'Invalid name';
            break;
        case 'email':
            if (!isValidEmail(value)) errorMessage = 'Invalid Email';
            break;
        case 'password':
            if (value.length < 6) errorMessage = 'Weak password';
            break;
        case 'confirm-password':
            const password = document.getElementById('password').value;
            if (value !== password) errorMessage = 'Password doesn\'t match';
            break;
    }

    displayError(input, errorMessage);
    return !errorMessage;
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    let isValid = true;
    form.querySelectorAll('input').forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function displayError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message') || document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!input.parentElement.contains(errorElement)) {
        input.parentElement.appendChild(errorElement);
    }
    input.style.borderColor = message ? '#dc3545' : '#f5f5f5';
}


// DashBoard

function handleLogin(event) {
    event.preventDefault();
    if (validateForm('login-form')) {
        // Assuming login is successful
        window.location.href = 'Dashboard/dashboard.html';
    }
}