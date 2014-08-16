/**
 * @venus-library mocha
 * @venus-include #node_modules/chrome-mock/build/chrome-mock-browser.js
 * @venus-code #scripts/background.js
 */
describe('background.js', function () {
  describe('create menu', function () {
    it('should have created the webber menu item', function () {
      expect(chrome.contextMenus.menus.length).to.be(1);
      expect(chrome.contextMenus.menus[0].onclick).to.be(handleMenuClick);
    });
  });
});
