'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

//to be taken out after development
chrome.storage.sync.set({'friends': []})
chrome.storage.sync.set({'processedLikes': []})

chrome.tabs.onActivated.addListener(function (tabId) {
	chrome.tabs.query({ active: true, currentWindow: true, url: '*://*.facebook.com/*' }, function (tabs) {
		let activeTab = tabs[0]
		chrome.pageAction.show(activeTab.id)
	})
});

chrome.tabs.onUpdated.addListener(function (tabId) {
	chrome.tabs.query({ active: true, currentWindow: true, url: '*://*.facebook.com/*' }, function (tabs) {
		let activeTab = tabs[0]
		chrome.pageAction.show(activeTab.id)

		chrome.runtime.onMessage.addListener(function (request, sender, sendMessage) {
			if (request.message === 'friendAdded' || request.message === 'friendRemoved') {
				chrome.tabs.sendMessage(activeTab.id, request)
			}
		})
	})
});