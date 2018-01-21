let inputFocused = null;

document.addEventListener('focusin', function(e) {
    inputFocused = e.target;
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event == "write") {
        inputFocused.value = request.value;
    }
});
