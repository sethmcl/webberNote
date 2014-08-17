var messages = require('./constants').messages;

module.exports = StoreClient;

/**
 * @constructor
 * @param {string} href
 * @param {MessageHandler} messaging
 */
function StoreClient(href, messaging) {
  this.messaging = messaging;

}

/**
 * Get all notes
 * @returns {Promise}
 */
StoreClient.prototype.getNotes = function () {
  return new Promise(function (resolve, reject) {
    messaging.emit(messages.GET_NOTES, function (notes) {
      resolve(notes);
    });
  });
};
