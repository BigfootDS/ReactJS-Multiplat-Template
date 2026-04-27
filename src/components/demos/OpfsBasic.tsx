export default function OpfscBasicDemo(){

	const createFile = async () => {
		// https://web.dev/articles/origin-private-file-system#create_new_files_and_folders
		// https://web.dev/articles/origin-private-file-system#write_to_a_file_by_streaming

		let userPrefsData = {
			theme: "dark",
			language: "en"
		}

		const opfsRoot = await navigator.storage.getDirectory();
		console.log(opfsRoot);
		const userPrefsFileHandle = await opfsRoot.getFileHandle("prefs.json", {create: true});
		const userPrefsWritable = await userPrefsFileHandle.createWritable();
		await userPrefsWritable.write(JSON.stringify(userPrefsData));
		await userPrefsWritable.close();

	}

	const getFile = async () => {
		// https://web.dev/articles/origin-private-file-system#access_existing_files_and_folders
		const opfsRoot = await navigator.storage.getDirectory();
		const existingUserPrefsHandle = await opfsRoot.getFileHandle("prefs.json", {});
		const fileData = await existingUserPrefsHandle.getFile();
		const fileText = await fileData.text();
		updateDisplayerDiv(fileText);		
	}

	const listAllFiles = async () => {
		// https://web.dev/articles/origin-private-file-system#list_the_contents_of_a_folder
		const opfsRoot = await navigator.storage.getDirectory();
		let fileList = []
		for await (let [name] of opfsRoot.entries()) {
			fileList.push(name);
		}
		updateDisplayerDiv(JSON.stringify(fileList))

	}

	const deleteAllFiles = async () => {
		// https://web.dev/articles/origin-private-file-system#delete_files_and_folders
		const opfsRoot = await navigator.storage.getDirectory();
		for await (let [name] of opfsRoot.entries()) {
			await (await navigator.storage.getDirectory()).removeEntry(name)
		}
		
	}

	const updateDisplayerDiv = (newContent: string) => {
		let targetDisplayer = document.getElementById("fileContents");
		if (targetDisplayer){
			targetDisplayer.innerText = newContent;
		}
	}

	return (
		<div className="card opfsBasic">
			<button onClick={() => listAllFiles()}>
				List All Files
			</button>
			<button onClick={() => createFile()}>
				Create File
			</button>
			<button onClick={() => getFile()}>
				Read File
			</button>
			<button onClick={() => deleteAllFiles()}>
				Delete All Files
			</button>
			<div id="fileContents"></div>
		</div>
	)
}