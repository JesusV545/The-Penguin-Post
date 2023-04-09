const newPostBtn = document.getElementById('new-post-btn');
const deletePostBtn = document.getElementById('delete-btn');
const editPostBtn = document.getElementById('edit-btn');

//need to make a newPost function
async function newPost(e) {
    e.preventDefault();
    //need to get the values from the new post form
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
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

//need to create deletePost function
async function deletePost(e) {
  //need to delete with a DELETE request
  if (e.target.hasAttribute('data-id')) {
    const id = e.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post!');
    }
  }
};

//need to create editPost function
async function editPost() {
  if (e.target.hasAttribute('data-id')) {
    const id = e.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        title, 
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit post!');
    }
  }
};

//need to add event that creates the new post
newPostBtn.addEventListener('click', newPost);
//need to add event to delete post
deletePostBtn.addEventListener('click', deletePost);
//need to add event to update post
editPostBtn.addEventListener('click', editPost);