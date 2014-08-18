'use strict';

var messages       = require('../lib/constants').messages;
var MessageRouter  = require('../lib/MessageRouter');
var ContextMenu    = require('../lib/ContextMenu');
var Store          = require('../lib/Store');

var menu           = new ContextMenu();
var router         = new MessageRouter();
var store          = new Store(router);

menu.init();
store.init();
