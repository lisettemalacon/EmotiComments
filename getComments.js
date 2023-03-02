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
        // const contentDiv = document.querySelectorAll("[id='content']")
        for (let i = 0; i < commentThreads.length; i++) {
            const emotion = largestEmotions[i];
            let imgURL = "";
            if (emotion === "Happy") {
                imgURL = "https://o.remove.bg/downloads/546f8827-def7-4979-8a71-aa060d8870ce/1-removebg-preview.png";
            } else if (emotion === "Sad") {
                imgURL = "https://o.remove.bg/downloads/8a988616-5f7b-41eb-9d1a-8683763098a1/2-removebg-preview.png";
            } else if (emotion === "Fear") {
                imgURL = "https://o.remove.bg/downloads/55749f72-8633-48c1-8a1b-7b81331c5d42/3-removebg-preview.png";
            } else if (emotion === "Bored") {
                imgURL = "https://o.remove.bg/downloads/b8410755-8429-4452-a322-75571c8e5173/4-removebg-preview.png";
            } else if (emotion === "Angry") {
                imgURL = "https://o.remove.bg/downloads/1df4edd9-2cbb-473d-8873-e470be5c5bc4/5-removebg-preview.png";
            } else {
                imgURL = "https://o.remove.bg/downloads/376d8a06-e337-4201-b821-239080616eaa/6-removebg-preview.png";
            }
            const commentThread = commentThreads[i];
            commentThread.style.position = 'relative';
            const newDiv = document.createElement("div");
            newDiv.style.backdropFilter = 'blur(5px)';
            newDiv.style.width = '920px';
            newDiv.style.height = '300px';
            newDiv.style.position = 'absolute';

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
