/**
 * @venus-library mocha
 * @venus-code #lib/dom.js
 * @venus-fixture dom.fixture.html
 */
describe('dom.js', function () {
  var dom;

  beforeEach(function () {
    dom = window.dom;
  });

  describe('selectorToNodes', function () {
    it('should select correct nodes', function () {
      var nodes = dom.selectorToNodes('.my-nodes');
      expect(nodes.length).to.be(3);
    });
  });

});
