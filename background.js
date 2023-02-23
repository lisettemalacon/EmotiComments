// chrome.browserAction.onClicked.addListener(function(tab) {
//     // chrome.tabs.executeScript(null, {file: "./scripts/getComments.js"});
//     alert("clicked")
// });

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
                files: ["getComments.js"],
            })
            .then(() => console.log("script injected in all frames"));
    } else if (nextState === 'OFF') {
        // Remove the CSS file when the user turns the extension off
        console.log("extension off")
    }
});