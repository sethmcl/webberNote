'use strict';

function hydrateNotes() {
  var notes = getSavedNotes();
  notes.forEach(function(note) {
    var maybeNodes = document.querySelectorAll(note.selector);
    for (var i=0, node; (node=maybeNodes[i]); i++) {
      var textContent = node.innerHTML;
      var split = textContent.split(note.text);
      if (split.length > 1) {
        var parentNode = node.parentNode;
        var mark = document.createElement('mark');
        mark.setAttribute('class', 'webber-note');
        mark.setAttribute('title', note.note);
        mark.innerHTML = note.text;
        node.innerHTML = split[0] + '<mark title="' + note.note + '">' + note.text + '</mark>' + split[1];
      }
    }
  });
}

function getCurrentSelection() {
  return window.getSelection();
}

function rangeToHtml(range) {
  var frag = range.cloneContents();
  var div = document.createElement('div');
  div.appendChild(frag);
  return div.innerHTML;
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  var range, sel, note, html;
  if (request.type === 'make-note-menu-clicked') {
    sel = getCurrentSelection();
    range = sel.getRangeAt(0);
//    range.surroundContents(document.createElement('mark'));
    html = rangeToHtml(range);
    note = new Note(html, prompt('Enter your note here:'));
    note.setSelector(note.createSelectorForRange(range));
    note.persist();
    hydrateNotes();
  }
});

function getSavedNotes() {
  var savedNotes = localStorage.getItem('allWebberNotes');
  if (savedNotes) {
    savedNotes = JSON.parse(savedNotes);
  } else {
    savedNotes = [];
  }
  return savedNotes;
}

function saveNotes(notes) {
  localStorage.setItem('allWebberNotes', JSON.stringify(notes));
}


function Note(text, note) {
  this.text = text;
  this.note = note;
}

Note.prototype.setSelector = function(selector) {
  this.selector = selector;
};

Note.prototype.createSelectorForRange = function(range) {
  var node = range.startContainer;
  var classes;
  var querySelector = [];
  node = !node.tagName ? node.parentNode : node;
  while (node) {
    if (node.id) {
      querySelector.push(node.tagName.toLowerCase() + '#' + node.id);
      break;
    }

    if (node.classList.length) {
      querySelector.push(node.tagName.toLowerCase() + '.' + node.classList.join('.'));
    } else {
      querySelector.push (node.tagName.toLowerCase());
    }
    node = node.parentNode;
  }
  return querySelector.reverse().join(' ');
};

Note.prototype.persist = function() {
  var savedNotes = getSavedNotes();
  savedNotes.push(this.toJSON());
  saveNotes(savedNotes);
};

Note.prototype.toJSON = function() {
  var data = {
    text: this.text,
    note: this.note,
    selector: this.selector,
  };
  return data;
};

Note.prototype.addToDom = function() {
};

function init() {
  hydrateNotes();
}

init();
