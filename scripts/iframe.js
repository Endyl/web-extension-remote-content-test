function onMessage(e) {
	let newItem = document.createElement('li');
	newItem.innerHTML = e.data;
	document.getElementById('remote-list').appendChild(newItem);
}
window.addEventListener('message', onMessage);
