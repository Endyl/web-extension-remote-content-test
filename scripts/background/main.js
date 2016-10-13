browser.browserAction.onClicked.addListener((aTab) => {
	browser.tabs.create({
		active: true,
		url: browser.runtime.getURL('scripts/remote-test.html')
	}).then(
		(aTab) => {
			//
		},
		(aReason) => {
			console.log('Tab opening failed!', aReason);
		}
	);
});
