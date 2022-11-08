const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = $('#username').val().trim();
  const password = $('#password-login').val().trim();
  const lobby = $('#lobby-id').val().trim();

  if (username && password && lobby) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, lobby }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// Not sure if we need a separate sign up path???
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = $('#username').val().trim();
  const password = $('#password-login').val().trim();
  const lobby = $('#lobby-id').val().trim();

  if (username && password && lobby) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password, lobby }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

$('#login-btn').on('click', () => {
  loginFormHandler();
})

$('#signup-btn').on('click', () => {
  loginFormHandler();
})
