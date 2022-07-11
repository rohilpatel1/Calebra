// getId('updateButton').addEventListener('click', _ => {
//   location.reload();
// });


navigator.serviceWorker.addEventListener('message', event => {
  getId('version').innerText = event.data.version;
});