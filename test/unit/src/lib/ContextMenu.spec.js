/**
 * @venus-library mocha
 * @venus-include #node_modules/chrome-mock/chrome-mock-browser.js
 * @venus-code #lib/ContextMenu.js
 */
describe('ContextMenu.js', function () {
  var cm;

  beforeEach(function () {
    cm = new window.ContextMenu();
  });

  it('should create a new menu', function () {
    cm.init();
    expect(window.chrome.contextMenus.create.callCount).to.be(1);
  });



});
