const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

//need to create the loginHandler function
async function loginHandler(e) {
    e.preventDefault();
    //need to get the username and password values from the form
    const username = document.getElementById('user-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
    //need to check if the user and pass are correct 
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
          } else {
            alert('Wrong username or password!');
          }
    }

};

//need to make sighupHandler function
async function signupHandler(e) {
    e.preventDefault();
    //need to get the username and password values from the signup form 
    const username = document.getElementById('user-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    //need to send a post request with the new user and pass to create account
    if (username && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Wrong username or password!');
        }
      }
};

//need to add an event that will log the user in
loginBtn.addEventListener('click', loginHandler);
//need to add an event that will let the user sign up 
signupBtn.addEventListener('click', signupHandler);
