let remoteIframe = null;
const iframeContent = `<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
		<title>Remote content iframe</title>
		<script src="{{scriptSrc}}"></script>
	</head>

	<body>
		<p>Remote content will be added to this list:</p>
		<ul id="remote-list">
			<li>Non-remote item</li>
		</ul>
	</body>
</html>`;

function onClick(e) {
	if (!remoteIframe) {
		updateButton();
		createIframe();
	}
	else {
		addRemoteContentToIframe();
	}
}

function createIframe() {
	remoteIframe = document.createElement('iframe');
	remoteIframe.setAttribute('sandbox', 'allow-scripts');
	remoteIframe.setAttribute('srcdoc', getInitialIframeContent());

	document.body.appendChild(remoteIframe);
}

function getInitialIframeContent() {
	let content = iframeContent;

	let urlParts = window.location.href.split('/');
	urlParts[urlParts.length - 1] = 'iframe.js';
	content = content.replace('{{scriptSrc}}', urlParts.join('/'));

	return content;
}

function updateButton() {
	let button = document.getElementById('create-iframe');
	button.textContent = 'Add remote content to iframe';
}

function addRemoteContentToIframe() {
	let remoteContent = fetchRemoteContent();
	remoteIframe.contentWindow.postMessage(remoteContent, '*');
}
function fetchRemoteContent() {
	// this would fetch some (possibly script containing html)
	// content from a web API
	return ['Some remote content.',
			'<a href="http://example.com" onclick="alert(\'Remote script!\');">link</a>',
			'<script>alert("Remote script!")</script>',
			'<br/>'+(new Date()).getTime()].join('\n');
}

document.getElementById('create-iframe').addEventListener('click', onClick);
