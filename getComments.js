
let commentContents = document.querySelectorAll("[id='content-text']");
// Prints out the comment content for the first 20 comments.
for (let i = 0; i < commentContents.length; i++) {
    console.log(commentContents[i].textContent);

}

const commentThreads = document.querySelectorAll("[id='content-text']");
const fullDiv = document.querySelector('ytd-app');
// const contentDiv = document.querySelectorAll("[id='content']")
for (let i = 0; i < commentThreads.length; i++) {
    const commentThread = commentThreads[i];
    commentThread.style.position = 'relative';
    const newDiv = document.createElement("div");
    newDiv.style.backdropFilter = 'blur(5px)';
    newDiv.style.width = '920px';
    newDiv.style.height = '300px';
    newDiv.style.position = 'absolute';
    
    newDiv.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.style.backgroundColor = 'white';
        modal.style.width = '300px';
        modal.style.height = '300px';
        modal.style.position = 'fixed';
        modal.style.left = '50%';
        modal.style.top = '50%';
        modal.style.transform = 'translate(-50%, -50%)';

        const revealContent = document.createElement('h2');
        revealContent.style.color = 'black';
        revealContent.textContent = "Reveal comment";
        modal.appendChild(revealContent);

        const yesButton = document.createElement('button');
        yesButton.textContent = "YES, REVEAL";
        yesButton.addEventListener("click", function() {
            commentThread.removeChild(commentThread.firstChild);
            commentThread.removeChild(modal);
        })
        const noButton = document.createElement('button');
        noButton.textContent = "NO, CANCEL";
        noButton.addEventListener("click", function() {
            commentThread.removeChild(modal);
        })
        modal.appendChild(noButton);
        modal.appendChild(yesButton);
        // fullDiv.insertBefore(modal, fullDiv.firstChild);
        commentThread.appendChild(modal);

    })
    commentThread.insertBefore(newDiv, commentThread.firstChild);
}

