'use strict';

var messages    = require('../lib/constants').messages;
var ContextMenu = require('../lib/ContextMenu');
var menu        = new ContextMenu();

chrome.runtime.onMessage.addListener(function (request, sender, respond) {
  if (request.type === messages.GET_NOTES) {
    respond(store.getNotes());
  }
});

menu.init();

