let link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Poppins:wght@300&display=swap" rel="stylesheet');
document.head.appendChild(link);

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
            let emotionColor = "";
            if (emotion === "Happy") {
                imgURL = "https://i.imgur.com/piizLAK.png";
                //emotionColor = '#ef96d8';
                emotionColor = 'rgba(239, 150, 216, 0.4)';
            } else if (emotion === "Sad") {
                imgURL = "https://i.imgur.com/C2yq6m1.png";
                emotionColor = 'rgba(154, 202, 255, 0.4)';
                //emotionColor = '#9acaff';
            } else if (emotion === "Fear") {
                imgURL = "https://i.imgur.com/kOopfvY.png";
                emotionColor = 'rgba(157, 182, 50, 0.4)';
                //emotionColor = '#9db632';
            } else if (emotion === "Bored") {
                imgURL = "https://i.imgur.com/cZlg9yQ.png";
                emotionColor = 'rgba(230, 135, 37, 0.4)';
                //emotionColor = '#e68725';
            } else if (emotion === "Angry") {
                imgURL = "https://i.imgur.com/qM1bNp3.png";
                emotionColor = 'rgba(255, 82, 78, 0.4)';
                //emotionColor = '#ff524e';
            } else {
                imgURL = "https://i.imgur.com/OlAk4Xi.png";
                emotionColor = 'rgba(255, 240, 0, 0.4)';
                //emotionColor = '#fff000';
            }


            const commentThread = commentThreads[i];
            commentThread.style.position = 'relative';
            commentThread.style.display = 'flex';
            const newDiv = document.createElement("div");
            newDiv.style.backdropFilter = 'blur(5px)';
            newDiv.style.width = (window.innerWidth + 50) + "px";
            newDiv.style.height = window.innerHeight + "px";
            newDiv.style.position = 'absolute';
            newDiv.style.backgroundColor = emotionColor;

            // const test = window.innerWidth + "px";
            // console.log('test', typeof(test));
            // console.log("w", window.innerWidth + "px");
            // console.log(typeof(window.innerWidth));
            // console.log("h", window.innerHeight + "px");



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
                const modalBackground = document.createElement('div');
                modalBackground.style.display = 'block';
                modalBackground.style.position = 'fixed';
                modalBackground.style.zIndex = '1';
                modalBackground.style.left = '0';
                modalBackground.style.top = '0';
                modalBackground.style.width = '100%';
                modalBackground.style.height = '100%';
                modalBackground.style.overflow = 'auto';
                modalBackground.style.padding = '8px';
                modalBackground.style.backgroundColor = 'rgba(0,0,0,0.5)';


                const modal = document.createElement('div');
                modal.style.backgroundColor = 'white';
                modal.style.width = '343px';
                modal.style.height = '224px';
                modal.style.position = 'fixed';
                modal.style.left = '50%';
                modal.style.top = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
                modal.style.borderRadius = '8px'

                modalBackground.appendChild(modal);

                const revealContent = document.createElement('h2');
                revealContent.style.color = 'black';
                revealContent.textContent = "Reveal comment";
                revealContent.style.fontFamily = 'Lato';
                revealContent.style.fontWeight = 'medium';
                revealContent.style.fontSize = '20px';
                revealContent.style.margin = '27px';
                revealContent.style.color = '#334253';
                modal.appendChild(revealContent);

                const warningText = document.createElement('p');
                warningText.style.color = '#67727E';
                warningText.style.fontFamily = 'Lato';
                warningText.style.fontSize = '16px';
                warningText.textContent = 'This comment may contain sensitive information. Are you sure you want to reveal this comment?';
                warningText.style.margin = '27px';

                modal.appendChild(warningText);

                const buttonDiv = document.createElement('div');
                buttonDiv.style.flexDirection = 'row';
                buttonDiv.style.margin = '27px';
                buttonDiv.style.justifyContent = 'center';
                buttonDiv.style.alignItems = 'center';

                const yesButton = document.createElement('div');
                yesButton.style.width = '138px';
                yesButton.style.height = '48px';
                yesButton.style.backgroundColor = '#5357B6';
                yesButton.style.borderRadius = '8px';
                yesButton.style.marginLeft = '10px';
                yesButton.style.cursor = 'pointer';

                const yesText = document.createElement('p');
                yesText.textContent = "YES, REVEAL";
                yesText.style.color = 'white';
                yesText.style.fontFamily = 'Lato';
                yesText.style.fontSize = '16px';
                yesText.style.padding = '18px';
                yesText.style.userSelect = 'none';
                //yesText.style.marginBottom = '-35px';
                yesText.style.position = 'fixed';
                yesText.style.bottom = '10px';
                yesButton.appendChild(yesText);
                
                yesButton.addEventListener("click", function () {
                    commentThread.removeChild(commentThread.firstChild);
                    commentThread.removeChild(modalBackground);
                })

                const noButton = document.createElement('div');
                noButton.style.width = '138px';
                noButton.style.height = '48px';
                noButton.style.backgroundColor = '#67727e';
                noButton.style.borderRadius = '8px';
                noButton.style.cursor = 'pointer';
                //noButton.style.position = 'absolute';

                const noText = document.createElement('p');
                noText.textContent = "NO, CANCEL";
                noText.style.color = 'white';
                noText.style.fontFamily = 'Lato';
                noText.style.fontSize = '16px';
                noText.style.position = 'fixed';
                noText.style.bottom = '10px';
                noText.style.padding = '18px';
                noText.style.userSelect = 'none';
                //noText.style.position = 'relative';

        
                noButton.appendChild(noText);

                noButton.addEventListener("click", function () {
                    commentThread.removeChild(modalBackground);
                })
                yesButton.style.display = 'inline-block';
                noButton.style.display = 'inline-block';

                buttonDiv.appendChild(noButton);
                buttonDiv.appendChild(yesButton);
                modal.appendChild(buttonDiv);
                // fullDiv.insertBefore(modal, fullDiv.firstChild);
                commentThread.appendChild(modalBackground);

            })
            commentThread.insertBefore(newDiv, commentThread.firstChild);
        }
    }
});
