const addCommentBtn =  document.getElementById('');

async function addComment(e) {
    e.preventDefault();

    const comment_text = document.getElementById('comment').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // If there is a comment -- preventing from users submitting empty comments 
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment!');
      }
    }
  }



addCommentBtn.addEventListener('click', addComment);