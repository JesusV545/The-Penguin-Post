const newPostBtn = document.getElementById('new-post-form');
  //need to make a newPost function
  async function newPost(e) {
      e.preventDefault();
      //need to get the values from the new post form
      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();
      //need to make request to create post
      if (title && content) {
          const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to create new post!');
          }
        }
  }

//need to add event that creates the new post
newPostBtn.addEventListener('submit', newPost);






