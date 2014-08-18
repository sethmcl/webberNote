var messages = require('../lib/constants').messages;

module.exports = Store;

/**
 * @constructor
 * @param {MessageRouter} router
 */
function Store(router) {
  this.router = router;
  this.data   = {};
}

/**
 * Initialize
 */
Store.prototype.init = function () {
  this.deserialize();
  this.router.on(messages.GET_NOTES, this.onGetNotes.bind(this));
  this.router.on(messages.SAVE_NOTE, this.onSaveNote.bind(this));
};

/**
 * @param {object} e Event object
 */
Store.prototype.onGetNotes = function (e) {
  e.respond(this.getNotes());
};

/**
 * @param {object} e Event object
 */
Store.prototype.onSaveNote = function (e) {
  var note = this.saveNote(e.request.note);
  e.respond(note);
};

/**
 * Save a note
 * @param {object} note
 */
Store.prototype.saveNote = function (note) {
  if (typeof note.id === 'undefined') {
    note.id = this.data._lastId = this.data._lastId + 1;
  }

  this.data.notes[note.id] = note;
  this.serialize();
  return note;
};

/**
 * @property {string}
 */
Store.prototype.storageKey = '__WEBBER_NOTE';

/**
 * Get list of all saved notes
 * @returns {array} notes
 */
Store.prototype.getNotes = function () {
  var notes = this.data.notes;

  return Object
    .keys(notes)
    .map(function (key) {
      return notes[key];
    });
};

/**
 * Serialize data to localStorage
 */
Store.prototype.serialize = function () {
  window.localStorage[this.storageKey] = JSON.stringify(this.data);
};

/**
 * Deserialize data from localStorage
 */
Store.prototype.deserialize = function () {
  var data, json;

  json = window.localStorage[this.storageKey];

  try {
    data = JSON.parse(json);
  } catch (e) {
    data = this.defaultStructure();
  }

  if (typeof data !== 'object') {
    data = this.defaultStructure();
  }

  this.data = data;

  return this.data;
};

/**
 * Default data structure
 * @returns {object}
 */
Store.prototype.defaultStructure = function () {
  return {
    _lastId: 0,
    notes: {}
  };
};
