"use strict";

var allDom;
var domholder = [];
for(var i = 1; i <= 4; i++) {
allDom = document.getElementById('div'+ i);
if(i == 1) {
  function display(doc) {
    allDom.innerHTML = doc;
  }
  // getting data
  db.collection('welcome').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
      display(doc);
  });
});
}
domholder.push(allDom);
allDom = '';
}

console.log(domholder);