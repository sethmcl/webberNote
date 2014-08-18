'use strict';

var messages      = require('../lib/constants').messages;
var MessageRouter = require('../lib/MessageRouter');
var StoreClient   = require('../lib/StoreClient');
var Page          = require('../lib/Page');

var href          = window.location.href;
var router        = new MessageRouter();
var store         = new StoreClient(href, router);
var page          = new Page(href, router, store);

page.init();
