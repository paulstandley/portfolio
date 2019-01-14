"use strict";

var allDom;
var domholder = [];
for(var i = 1; i <= 4; i++) {
allDom = document.getElementById(`div${i}`);
allDom.innerHTML = `<p>this is div${i} </p>`;
domholder.push(allDom);
allDom = '';
}

console.log(domholder);