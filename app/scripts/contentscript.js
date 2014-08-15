'use strict';

function getCurrentSelection() {
  return window.getSelection();
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  var range, sel;
  if (request.type === 'make-note-menu-clicked') {
    sel = getCurrentSelection();
    range = sel.getRangeAt(0);
    range.surroundContents(document.createElement('mark'));
    console.log(range.toString());
  }
});
