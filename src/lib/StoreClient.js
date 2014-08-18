var messages = require('./constants').messages;

module.exports = StoreClient;

/**
 * @constructor
 * @param {string} href
 * @param {MessageRouter} router
 */
function StoreClient(href, router) {
  this.router = router;
}

/**
 * Get all notes
 * @returns {Promise}
 */
StoreClient.prototype.getNotes = function () {
  return new Promise(function (resolve, reject) {
    this.router.send(messages.GET_NOTES, function (notes) {
      resolve(notes);
    });
  }.bind(this));
};

/**
 * Save a note
 * @param {object} note
 * @returns {Promise}
 */
StoreClient.prototype.saveNote = function (note) {
  return new Promise(function (resolve, reject) {
    this.router.send(messages.SAVE_NOTE, { note: note }, function (note) {
      resolve(note);
    });
  }.bind(this));
};
