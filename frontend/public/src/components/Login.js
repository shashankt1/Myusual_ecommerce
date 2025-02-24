document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('login-message');
    const loginContainer = document.getElementById('login-container');
    const protectedPage = document.getElementById('protected-page');
    const logoutBtn = document.getElementById('logout-btn');

    // Check if the user is already logged in (has JWT token)
    if (localStorage.getItem('token')) {
        showProtectedPage();
    }

    // Handle the login form submission
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Clear previous error messages
        loginMessage.textContent = '';
        loginMessage.classList.remove('error');
        loginMessage.classList.remove('success');

        // Simple validation check
        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }

        // Perform the login via AJAX (fetch API)
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                showSuccess('Login successful! Redirecting...');
                setTimeout(showProtectedPage, 1000);  // Show protected page after delay
            } else {
                showError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
        }
    });

    // Show the protected page and hide login
    function showProtectedPage() {
        loginContainer.style.display = 'none';
        protectedPage.style.display = 'block';
    }

    // Show error message
    function showError(message) {
        loginMessage.textContent = message;
        loginMessage.classList.add('error');
    }

    // Show success message
    function showSuccess(message) {
        loginMessage.textContent = message;
        loginMessage.classList.add('success');
    }

    // Handle the logout action
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('token');
        loginContainer.style.display = 'block';
        protectedPage.style.display = 'none';
    });
});
