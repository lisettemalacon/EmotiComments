

function hideComments() {
    let emotion = function (text, lang_code, API_KEY) {
        return new Promise((resolve, reject) => {
            if (!API_KEY) {
                reject({ error: 'API key is not set' });
            }
            if (!text || typeof (text) != "string") {
                reject({ error: 'Please provide a non-empty string' });
            }
            request.post({ url: 'http://apis.paralleldots.com/v4/emotion', form: { text: text, lang_code: lang_code, api_key: API_KEY } }, function (err, httpResponse, body) {
                if (err) {
                    reject({ "Error": err })
                }
                resolve(body);
            })
        })
    }

    // Be sure to set your API key
    // pd.apiKey = "GlVnuRLINWWFsCIAi3Z6faniFRpLwQxEyHq0jJk0MWI";
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
            revealContent.textContent = "Reveal comment";
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

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {

    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
    });

    if (nextState === 'ON') {
        // Execute JavaScript when the user turns the extension on
        chrome.scripting
            .executeScript({
                target: { tabId: tab.id, allFrames: true },
                // func: hideComments,
                files: ["getComments.js"],
            })
            .then(() => console.log("script injected in all frames"));
    } else if (nextState === 'OFF') {
        // Remove the CSS file when the user turns the extension off
        console.log("extension off")
    }
});