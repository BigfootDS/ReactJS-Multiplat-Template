// Basically looking at how we can use a browser JS API to get filesystem access universally.
// e.g. NodeJS has filesystem, Android has filesystem, they are different. We'd need duplicate code.
// Capacitor has filesystem plugins, but they may break and not work in Electron sometimes.
// So if something can be done via browser APIs, we should stick to that!
// File System Access API is a new-ish browser API, documented here:
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access
// If we were using Tauri / letting users view this in whatever browser they want, 
// browser support (currently no Firefox or Safari) would be an issue.
// But Electron is Chromium.
// Android is Android, it should be Chrome by default and I don't know if user-installed browsers impact this.
// But the code below is confirmed to work on Android and Windows right now.

export default function FsAccessDemo() {
	const fileSelector = async () => {
		// Note for DIYers, TypeScript needs some configuration to make this work:
		// https://stackoverflow.com/a/71343465/9319097
		console.log(window.showOpenFilePicker);
		let [fileHandle] = await window.showOpenFilePicker();
		console.log(fileHandle);
		const fileResult = await fileHandle.getFile();
		const fileContents = await fileResult.text();
		let outputDiv = document.getElementById("fsAccessApiReadOutput");
		if (outputDiv) {
			outputDiv.innerText = fileContents;
		}
	};

	return (
		<div className="card fsAccessApi">
			<button onClick={() => fileSelector()}>
				Open a File (pick something small, like a text file!)
			</button>
			<h3>File contents:</h3>
			<div id="fsAccessApiReadOutput"></div>
		</div>
	);
}
