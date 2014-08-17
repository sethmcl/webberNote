var messages = require('./constants').messages;

module.exports = ContextMenu;

/**
 * @constructor
 */
function ContextMenu() {

}

/**
 * Create the context menu
 */
ContextMenu.prototype.init = function () {
  chrome.contextMenus.create({
    title: 'Make a note',
    type: 'normal',
    contexts: ['selection', 'image'],
    onclick: this.onClick
  });
};

/**
 * Handle menu click event
 * @param {object} info
 * @param {object} tab
 */
ContextMenu.prototype.onClick = function (info, tab) {
  console.log('info:');
  console.log(info);
  console.log('tab:');
  console.log(tab);
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: messages.CTX_MENU_CLICK});
  });
};
