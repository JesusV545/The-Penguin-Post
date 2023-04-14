const editPostBtn = document.getElementById('edit-post-form');
//need to create editPost function
async function editPost(e) {
    e.preventDefault();
    const title = document.getElementById('new-title').value.trim();
    const content = document.getElementById('new-content').value.trim();
    const id = window.location.pathname.split('/').pop();

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
        document.location.replace('/dashboard/');
      } else {
        alert("There was an error updating the post!");
      }
};

//need to add event to update post
editPostBtn.addEventListener('submit', editPost);