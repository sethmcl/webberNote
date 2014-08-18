"use strict";function hydrateNotes(){var a=getSavedNotes();a.forEach(function(a){for(var b,c=document.querySelectorAll(a.selector),d=0;b=c[d];d++){var e=b.innerHTML,f=e.split(a.text);if(f.length>1){var g=(b.parentNode,document.createElement("mark"));g.setAttribute("class","webber-note"),g.setAttribute("title",a.note),g.innerHTML=a.text,b.innerHTML=f[0]+'<mark title="'+a.note+'">'+a.text+"</mark>"+f[1]}}})}function getCurrentSelection(){return window.getSelection()}function rangeToHtml(a){var b=a.cloneContents(),c=document.createElement("div");return c.appendChild(b),c.innerHTML}function getSavedNotes(){var a=localStorage.getItem("allWebberNotes");return a=a?JSON.parse(a):[]}function saveNotes(a){localStorage.setItem("allWebberNotes",JSON.stringify(a))}function Note(a,b){this.text=a,this.note=b}function init(){hydrateNotes()}chrome.runtime.onMessage.addListener(function(a){var b,c,d,e;"make-note-menu-clicked"===a.type&&(c=getCurrentSelection(),b=c.getRangeAt(0),e=rangeToHtml(b),d=new Note(e,prompt("Enter your note here:")),d.setSelector(d.createSelectorForRange(b)),d.persist(),hydrateNotes())}),Note.prototype.setSelector=function(a){this.selector=a},Note.prototype.createSelectorForRange=function(a){var b=a.startContainer,c=[];for(b=b.tagName?b:b.parentNode;b;){if(b.id){c.push(b.tagName.toLowerCase()+"#"+b.id);break}c.push(b.classList.length?b.tagName.toLowerCase()+"."+b.classList.join("."):b.tagName.toLowerCase()),b=b.parentNode}return c.reverse().join(" ")},Note.prototype.persist=function(){var a=getSavedNotes();a.push(this.toJSON()),saveNotes(a)},Note.prototype.toJSON=function(){var a={text:this.text,note:this.note,selector:this.selector};return a},Note.prototype.addToDom=function(){},init();