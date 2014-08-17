module.exports = Page;

/**
 * @constructor
 * @param {string} href Page's URL
 * @param {Store} store Data store
 */
function Page(href, store) {

}

/**
 * Initialize
 */
Page.prototype.init = function () {
  this.listenToRuntime();
};

/**
 * Hydrate notes on page (call this on page load)
 */
Page.prototype.hydrateNotes = function () {
  
};

/**
 * Render notes on page
 * @param {object} notes
 */
Page.prototype.renderNotes = function (notes) {

};

/**
 * Retrieve notes for this page
 * @returns {object} notes
 */
Page.prototype.getNotes = function () {
  return this.store.getNotes(this.href);
};

/**
 * Listen for messages from runtime
 */
Page.prototype.listenToRuntime = function () {

};
