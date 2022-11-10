const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = $('#username').val().trim();
  const password = $('#password').val().trim();
  // const lobby = $('#lobby-id').val().trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({name: username, password: password}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.status === 200) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      const responseMessage = await response.json();
      alert(responseMessage.message);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = $('#username').val().trim();
  const password = $('#password').val().trim();
  //TODO: implement multiplayer features
  // const lobby = $('#lobby-id').val().trim();
  // username && password && lobby
  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({name: username, password: password}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      document.location.replace('/dashboard');
    } else {
      const responseMessage = await response.json();
      alert(responseMessage.message);
    }
  }
};

$('#login-btn').on('click', (e) => {
  loginFormHandler(e);
})

$('#signup-btn').on('click', (e) => {
  signupFormHandler(e);
})
