// Browsers have a limited amount of data storage space available to use;
// https://web.dev/articles/persistent-storage
// Browsers also have an "eviction" process that wipes out data in rare situations;
// https://web.dev/articles/storage-for-the-web#eviction
// Based on the above reading, things like LocalStorage are not ideal for long-term data persistence.
// Looks like LocalStorage is also not ideal in more-complex apps that need performance gains - 
// LocalStorage is synchronous, blocks the main thread, and is not accessible from web workers or service workers.
// Should be better to try other browser APIs such as Indexed DB or 
// even run SQLite through the browser's origin private file system, if possible.

import { useEffect, useState } from "react";
import { db } from "../../utils/database/db";

// This file shows some basic implementation of indexed DB data read and write, 
// to ensure it works on Capacitor- and Electron-managed platforms.

// This may also be worth trying here, maybe:
// https://stackoverflow.com/a/58646390/9319097
// https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist

export default function SqliteOpfsDemo(){

	let [usersData, setUsersdata] = useState<object[]>();

	const getUsers = async () => {
		console.log("Starting to search the DB for users now...");
		const data = await db.selectFrom("user").selectAll().execute();
		console.log("We found this user data in the DB: " + JSON.stringify(data, null, 4));
		setUsersdata(data);
	}

	const createUsers = async () => {
		console.log("Starting to create a user now");
		const newUserData = await db.insertInto("user")
			.values({username:  "exampleUser", tier: "free"})
			.returning(["id", "tier", "username"])
			.execute();

			console.log("Created new user: " + JSON.stringify(newUserData));
	}

	useEffect(() => {
		let userDataDisplayerDiv = document.getElementById("userDataDisplayer");
		if (userDataDisplayerDiv){
			userDataDisplayerDiv.innerText = JSON.stringify(usersData) || "";
		}
	}, [usersData]);


	return (
		<div className="card sqliteOpfs">
			<code>Is secure context? {window.isSecureContext ? "TRUE" : "FALSE"}</code>
			<br />
			<button onClick={() => createUsers()}>
				Create a user 
			</button>
			<button onClick={() => getUsers()}>
				Get user data
			</button>
			<div id="userDataDisplayer"></div>
		</div>
	);
}