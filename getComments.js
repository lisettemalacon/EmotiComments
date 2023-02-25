
let commentContents = document.querySelectorAll("[id='content-text']");
// Prints out the comment content for the first 20 comments.
for (let i = 0; i < commentContents.length; i++) {
    console.log(commentContents[i].textContent);

}

const commentThreads = document.querySelectorAll("[id='content-text']");
// const contentDiv = document.querySelectorAll("[id='content']")
for (let i = 0; i < commentThreads.length; i++) {
    const commentThread = commentThreads[i];
    commentThread.style.position = 'relative';
    const newDiv = document.createElement("div");
    newDiv.style.backdropFilter = 'blur(5px)';
    newDiv.style.width = '900px';
    newDiv.style.height = '300px';
    newDiv.style.position = 'absolute';
    
    // click to unblur
    newDiv.addEventListener('click', function() {
        commentThread.removeChild(commentThread.firstChild)
    })
    commentThread.insertBefore(newDiv, commentThread.firstChild);
    
}

