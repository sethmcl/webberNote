var messages = require('../lib/constants').messages;
var dom      = require('./dom');

module.exports = Page;

/**
 * @constructor
 * @param {string} href Page's URL
 * @param {MessageRouter} router Router for communication with other parts of extension
 * @param {Store} store Data store
 */
function Page(href, router, store) {
  this.href   = href;
  this.router = router;
  this.store  = store;
}

/**
 * Initialize
 */
Page.prototype.init = function () {
  this.hydrateNotes();

  this.router.on(messages.CTX_MENU_CLICK, this.onContextMenuClick.bind(this));
};

/**
 * Event handler for when user clicks "Add a note" context menu
 * @param {object} e Event object
 */
Page.prototype.onContextMenuClick = function (e) {
  this.createNoteFromSelection();
};

/**
 */
Page.prototype.createNoteFromSelection = function () {
  var range = dom.getSelectedRange();

  var note = {
    html: dom.rangeToHtml(range),
    text: window.prompt('Enter your note here:'),
    selector: dom.rangeToSelector(range),
    href: this.href
  };

  this
    .store
    .saveNote(note)
    .then(this.renderNote.bind(this));
};

/**
 * Hydrate notes on page (call this on page load)
 */
Page.prototype.hydrateNotes = function () {
  this.store.getNotes().then(this.renderNotes.bind(this));
};

/**
 * Render a list of notes on page
 * @param {array} notes
 */
Page.prototype.renderNotes = function (notes) {
  notes.forEach(this.renderNote.bind(this));
};

/**
 * Render a single note
 * @param {object} note
 */
Page.prototype.renderNote = function (note) {
  var domNodes = dom.selectorToNodes(note.selector);

  domNodes
    .filter(function (domNode) {
      return domNode.innerHTML.indexOf(note.html) !== -1;
    })
    .forEach(function (domNode) {
      var html = domNode.innerHTML.split(note.html);
      domNode.innerHTML = [html[0], '<mark title="', note.text, '">', note.html, '</mark>', html[1]].join('');
    });
};

/**
 * Retrieve notes for this page
 * @returns {object} notes
 */
Page.prototype.getNotes = function () {
  return this.store.getNotes(this.href);
};
