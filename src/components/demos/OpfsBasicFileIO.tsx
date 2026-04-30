import { useState } from "react";


export default function OpfsBasicFileIO(){
	let [customTextContent, setCustomTextContent] = useState("Bee Movie Script goes here blah blah blah");



	const createFile = async () => {
		// https://web.dev/articles/origin-private-file-system#create_new_files_and_folders
		// https://web.dev/articles/origin-private-file-system#write_to_a_file_by_streaming


		const opfsRoot = await navigator.storage.getDirectory();
		console.log(opfsRoot);
		const userPrefsFileHandle = await opfsRoot.getFileHandle("exampleFile.txt", {create: true});
		const userPrefsWritable = await userPrefsFileHandle.createWritable();
		await userPrefsWritable.write(customTextContent);
		await userPrefsWritable.close();

	}

	const getFile = async () => {
		// https://web.dev/articles/origin-private-file-system#access_existing_files_and_folders
		const opfsRoot = await navigator.storage.getDirectory();
		const existingUserPrefsHandle = await opfsRoot.getFileHandle("exampleFile.txt", {});
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
				Write File
			</button>
			<button onClick={() => getFile()}>
				Read File
			</button>
			<button onClick={() => deleteAllFiles()}>
				Delete All Files
			</button>
			<div>
				<label htmlFor="customTextInput">Custom Text Content:</label>
				<br />
				<textarea 
					name="customTextInput"
					id="customTextInput" 
					value={customTextContent}
					onChange={(event) => setCustomTextContent(event.target.value)}
					rows={5}
					cols={50}
				/>
			</div>
			<div id="fileContents"></div>
		</div>
	)
}