/**
 * @venus-library mocha
 * @venus-include #node_modules/chrome-mock/browser.js
 * @venus-code #lib/Page.js
 * @venus-fixture Page.fixture.html
 */
describe('Page.js', function () {
  var page;

  describe('renderNote', function () {
    beforeEach(function () {
      page = new window.Page();
      window.chrome.resetMock();
    });

    it('should render a note', function () {
      page.renderNote({
        selector: '#a-test-space',
        html: '<strong>today</strong>',
        text: 'test note'
      });

      var noteEl = document.querySelector('#note-container');

      expect(noteEl.innerHTML).to.be(
        '<mark title="test note"><strong>today</strong></mark>'
        );

    });
  });
});
