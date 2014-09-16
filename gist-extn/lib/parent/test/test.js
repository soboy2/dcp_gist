var assert = require("assert");
var dcpGist = require('../dcpGist.js');

describe('DCP Gist', function(){
  describe('Background Module', function(){
    it('should have an init Method', function(){
      assert.equal(typeof dcpGist, 'object');
      assert.equal(typeof dcpGist.init, 'function');
    })
    it('gistBookmarkUrl should be equal to http://mighty-woodland-8571.herokuapp.com/articles', function(){
      assert.equal(typeof dcpGist.vars, 'object');
      assert.equal(dcpGist.vars.gistBookmarkUrl, 'http://mighty-woodland-8571.herokuapp.com/articles');
    })

    it('should have a makePostRequest Method', function(){
      assert.equal(typeof dcpGist, 'object');
      assert.equal(typeof dcpGist.makePostRequest, 'function');
    })

    // var simulatedPostReq = {status: 'success'};
    //
    // function postCallback(response){
    //   expect(response.status).to.equal('success');
    // }
    //
    // it('makePostRequest should make a post request', function(){
    //   assert.equal(dcpGist.makePostRequest(), 'function');
    // })

    it('should have a pageNotBookmarked Method', function(){
      assert.equal(typeof dcpGist, 'object');
      assert.equal(typeof dcpGist.pageNotBookmarked, 'function');
    })
    it('dcpGist.pageNotBookmarked(marked) should equal true when marked == -1', function(){
      assert.equal(dcpGist.pageNotBookmarked(-1), true);
    })
    it('dcpGist.pageNotBookmarked(marked) should equal false when marked != -1', function(){
      assert.equal(dcpGist.pageNotBookmarked(1), false);
    })

    it('should have an isUndefined Method', function(){
      assert.equal(typeof dcpGist, 'object');
      assert.equal(typeof dcpGist.isUndefined, 'function');
    })
    it('dcpGist.isUndefined(obj) should equal true when typeof obj === undefined', function(){
      var obj = undefined;
      assert.equal(dcpGist.isUndefined(obj), true);
    })
    it('dcpGist.isUndefined(obj) should equal false when typeof obj !== undefined', function(){
      var obj = 1;
      assert.equal(dcpGist.isUndefined(obj), false);
    })

    it('should have a isNull Method', function(){
      assert.equal(typeof dcpGist, 'object');
      assert.equal(typeof dcpGist.isNull, 'function');
    })
    it('dcpGist.isNull(obj) should equal true when obj === null', function(){
      var obj = null;
      assert.equal(dcpGist.isNull(obj), true);
    })
    it('dcpGist.isNull(obj) should equal false when obj !== null', function(){
      var obj = 1;
      assert.equal(dcpGist.isNull(obj), false);
    })

  })
})
