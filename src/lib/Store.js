var constants = require('./constants');

module.exports = Store;

/**
 * @constructor
 */
function Store() {

}

/**
 * @property {string}
 */
Store.prototype.storageKey = '__WEBBER_NOTE';

/**
 * @param {string} href Get notes belonging to this URL
 * @returns {array} notes
 */
Store.prototype.getNotes(href) {

};
