
fetch('json/data.json')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  console.log(JSON.stringify(myJson.hi));
}).catch(function(error) {
  console.error(error);
});
/*
function render(doc) {
  console.dir(doc);
}

// getting data
db.collection('users').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
      render(doc);
  });
});
*/