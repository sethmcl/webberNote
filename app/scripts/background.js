'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
});

chrome.contextMenus.create({
  title: 'Make a note',
  type: 'normal',
  contexts: ['selection', 'image'],
  onclick: handleMenuClick
});

function handleMenuClick(info, tab) {
  console.log('info:');
  console.log(info);
  console.log('tab:');
  console.log(tab);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'make-note-menu-clicked'});
  });
}
