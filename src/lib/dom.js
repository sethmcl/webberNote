module.exports = {

  /**
   * Get the currently selected range
   * @returns {DOMRange}
   */
  getSelectedRange: function () {
    return window.getSelection().getRangeAt(0);
  },

  /**
   * Get HTML of selected range
   */
  getSelectedHtml: function () {
    return this.rangeToHtml(this.getSelectedRange());
  },

  /**
   * Convert dom range to HTML markup
   * @param {DOMRange} range
   * @returns {string} html markup
   */
  rangeToHtml: function (range) {
    var frag = range.cloneContents();
    var div = document.createElement('div');
    div.appendChild(frag);
    return div.innerHTML;
  },

  /**
   * Get query selector string for a given range
   * @param {DOMRange} range
   * @returns {string} query selector
   */
  rangeToSelector: function (range) {
    var node          = range.startContainer;
    var querySelector = [];
    var classes;

    node = !node.tagName ? node.parentNode : node;

    while (node) {
      if (node.id) {
        querySelector.push(node.tagName.toLowerCase() + '#' + node.id);
        break;
      }

      if (node.classList.length) {
        querySelector.push(node.tagName.toLowerCase() + '.' + this.domListToArray(node.classList).join('.'));
      } else {
        querySelector.push(node.tagName.toLowerCase());
      }
      node = node.parentNode;
    }

    return querySelector.reverse().join(' ');
  },

  /**
   * Get list of DOM nodes from selector
   * @param {string} selector
   * @returns {array}
   */
  selectorToNodes: function (selector) {
    return this.domListToArray(document.querySelectorAll(selector));
  },

  /**
   * Turn a DOM list into an Array
   * @param {list} list
   * @returns {array}
   */
  domListToArray: function (list) {
    return Array.prototype.slice.call(list, 0);
  }
};
