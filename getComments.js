
// const commentThread = document.querySelectorAll("ytd-comment-thread-renderer");
const commentContents = document.querySelectorAll("[id='content-text']");
// Prints out the comment content for the first 20 comments.
for (let i = 0; i < commentContents.length; i++) {
    console.log(commentContents[i].textContent);
}