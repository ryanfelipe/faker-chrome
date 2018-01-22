let inputFocused = null;

document.addEventListener('focusin', function(e) {
    inputFocused = e.target;
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event == "write") {
        return eventWrite(request, sender, sendResponse);
    }

    if (request.event == "alert") {
        return eventAlert(request, sender, sendResponse);
    }
});

/**
 * Execute the event write received from listener.
 *
 * @param request
 * @param sender
 * @param sendResponse
 */
const eventWrite = function(request, sender, sendResponse) {
    inputFocused.value = request.value;
};

/**
 * Execute the event alert received from listener.
 *
 * @param request
 * @param sender
 * @param sendResponse
 */
const eventAlert = function(request, sender, sendResponse) {
    alert(request.value);
};
