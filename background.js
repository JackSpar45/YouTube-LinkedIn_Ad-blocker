// Listener for installation and updates
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
       
        chrome.storage.sync.set({
            blockYouTube: false,
            blockLinkedIn: false
        }, () => {
            console.log('Default settings saved.');
        });
    } else if (details.reason === 'update') {
        
        console.log('Extension updated.');
    }
});

// Listener for messages from content scripts or popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getAdBlockingSettings') {
        
        chrome.storage.sync.get(['blockYouTube', 'blockLinkedIn'], (result) => {
            sendResponse(result);
        });
        return true; 
    }

    if (message.action === 'setAdBlockingSettings') {
        // Save ad blocking settings to storage
        chrome.storage.sync.set(message.settings, () => {
            sendResponse({status: 'Settings saved.'});
        });
        return true;  
    }
});

console.log('Background script running.');
