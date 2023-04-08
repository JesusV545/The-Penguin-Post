const logoutBtn = document.getElementById('logout-btn');

//need to create a logoutHandler function
async function logoutHandler() {
    //send fetch request to destroy session
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      //relocate the document
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
};
//need to create an event that logs the user out
logoutBtn.addEventListener('click', logoutHandler);
