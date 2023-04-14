const deletePostBtn = document.getElementById('delete-btn');

//need to create deletePost function
async function deletePost(e) {
    e.preventDefault();
    //need to delete with a DELETE request
    const id = window.location.pathname.split('/').pop();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert("There was an error deleting the post!");
      }

};

//need to add event to delete post
deletePostBtn.addEventListener('click', deletePost);