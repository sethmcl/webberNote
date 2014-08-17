'use strict';

var messages       = require('../lib/constants').messages;
var MessageHandler = require('../lib/MessageHandler');
var StoreClient    = require('../lib/StoreClient');
var Page           = require('../lib/Page');

var href           = window.location.href;
var messageHandler = new MessageHandler();
var store          = new StoreClient(href, messageHandler);
var page           = new Page(messageHandler, store);
