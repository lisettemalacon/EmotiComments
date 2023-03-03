let commentContents = document.querySelectorAll("[id='content-text']");
let emotionsPromises = [];
for (let i = 0; i < commentContents.length; i++) {
    let params = new URLSearchParams({
        lang_code: 'en',
        api_key: 'GlVnuRLINWWFsCIAi3Z6faniFRpLwQxEyHq0jJk0MWI',
        text: commentContents[i].textContent
    });
    emotionsPromises.push(fetch('https://apis.paralleldots.com/v4/emotion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Request completed successfully
            let comment_to_emotion = {};
            comment_to_emotion[i] = data;
            return comment_to_emotion;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        }));
}

function getLargestEmotion(emotions) {
    let largestEmotions = []
    for (let i = 0; i < emotions.length; i++) {
        let largestEmotionValue = -1;
        let largestEmotion;
        for (const emotionType in emotions[i][i].emotion) {
            if (emotions[i][i].emotion[emotionType] > largestEmotionValue) {
                largestEmotionValue = emotions[i][i].emotion[emotionType];
                largestEmotion = emotionType;
            }
        }
        largestEmotions.push(largestEmotion);
    }
    return largestEmotions;
}

Promise.all(emotionsPromises).then(emotions => {
    if (emotions.length !== 0) {
        const commentThreads = document.querySelectorAll("[id='content-text']");
        const largestEmotions = getLargestEmotion(emotions);
        //const contentDivs = document.querySelectorAll("[id='expander']");
        const commentRenderers = document.getElementsByTagName("ytd-comment-thread-renderer");
        //console.log(ytdExpanderElements);
        for (let i = 0; i < commentThreads.length; i++) {
            const emotion = largestEmotions[i];
            let imgURL = "";
            if (emotion === "Happy") {
                imgURL = "https://i.imgur.com/piizLAK.png";
            } else if (emotion === "Sad") {
                imgURL = "https://i.imgur.com/C2yq6m1.png";
            } else if (emotion === "Fear") {
                imgURL = "https://i.imgur.com/kOopfvY.png";
            } else if (emotion === "Bored") {
                imgURL = "https://i.imgur.com/cZlg9yQ.png";
            } else if (emotion === "Angry") {
                imgURL = "https://i.imgur.com/qM1bNp3.png";
            } else {
                imgURL = "https://i.imgur.com/OlAk4Xi.png";
            }
            const commentThread = commentThreads[i];
            commentThread.style.position = 'relative';
            commentThread.style.display = 'flex';
            const newDiv = document.createElement("div");
            newDiv.style.backdropFilter = 'blur(5px)';
            newDiv.style.width = '920px';
            newDiv.style.height = '300px';
            newDiv.style.position = 'absolute';

            const commentRender = commentRenderers[i];
            const commentExpanders = commentRender.querySelectorAll("[id='expander']");
            const commentExpander = commentExpanders[0];
            //console.log(commentExpander);
            const commentElements = commentExpander.getElementsByTagName('div');
            //console.log(commentElements[0]);
            const commentElement = commentElements[0];
            commentElement.style.minHeight = '50px';

            const emotionDiv = document.createElement("div");
            const img = document.createElement("img");
            img.src = imgURL;
            emotionDiv.appendChild(img);
            newDiv.appendChild(emotionDiv);

            newDiv.addEventListener('click', function () {
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
                revealContent.textContent = "Reveal comment " + emotion;
                modal.appendChild(revealContent);

                const yesButton = document.createElement('button');
                yesButton.textContent = "YES, REVEAL";
                yesButton.addEventListener("click", function () {
                    commentThread.removeChild(commentThread.firstChild);
                    commentThread.removeChild(modal);
                })
                const noButton = document.createElement('button');
                noButton.textContent = "NO, CANCEL";
                noButton.addEventListener("click", function () {
                    commentThread.removeChild(modal);
                })
                modal.appendChild(noButton);
                modal.appendChild(yesButton);
                // fullDiv.insertBefore(modal, fullDiv.firstChild);
                commentThread.appendChild(modal);

            })
            commentThread.insertBefore(newDiv, commentThread.firstChild);
        }
    }
});
