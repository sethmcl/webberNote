"use strict";function handleMenuClick(a,b){console.log("info:"),console.log(a),console.log("tab:"),console.log(b),chrome.tabs.query({active:!0,currentWindow:!0},function(a){chrome.tabs.sendMessage(a[0].id,{type:"make-note-menu-clicked"})})}chrome.runtime.onInstalled.addListener(function(){}),chrome.contextMenus.create({title:"Make a note",type:"normal",contexts:["selection","image"],onclick:handleMenuClick});