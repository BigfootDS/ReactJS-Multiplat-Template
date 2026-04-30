import { useEffect, useState } from "react";
import { sqlocalDb } from "../../utils/database/db";

export default function DataChecker(){
	let [isStoragePersisted, setIsStoragePersisted] = useState(false);
	let [isSecureContext, setIsSecureContext] = useState(false);
	let [sqlocalInfo, setSqlocalInfo] = useState({});
	let [storageUsageInfo, setStorageUsageInfo] = useState({});

	useEffect(() => {
		const getInfo = async () => {
			let sqlocalInfoLatest = await sqlocalDb.getDatabaseInfo();
			setSqlocalInfo(sqlocalInfoLatest);

			navigator.storage.estimate().then((estimate) => {
				let quotaMb = estimate.quota ? (estimate.quota / 1024 / 1024).toFixed(2) : "unknown";
				let usageMb = estimate.usage ? (estimate.usage / 1024 / 1024).toFixed(2) : "unknown";
				setStorageUsageInfo({
					quota: quotaMb,
					usage: usageMb,
					usagePercent: (((estimate.usage || 100) / (estimate.quota || 100)) * 100).toFixed(6) + "%"
				});
		  	});

			await persistCheck();
			setIsSecureContext(window.isSecureContext);
		}

		getInfo();
	}, []);

	const persistCheck = async () => {
		let persistedResult = await navigator.storage.persisted();
		if (!persistedResult){
			persistedResult = await navigator.storage.persist();
		}

		setIsStoragePersisted(persistedResult);
	}

	return (
		<div className="dataChecker" style={{textAlign: "left"}}>
			<div>
				<h3>Is Storage Persisted? {isStoragePersisted.toString().toLocaleUpperCase()}</h3>
			</div>
			<div>
				<h3>Is Secure Context? {isSecureContext.toString().toLocaleUpperCase()}</h3>
			</div>
			<div>
				<h3>SQLocal Connection Info:<br /><pre style={{textAlign: "left"}}>{JSON.stringify(sqlocalInfo, null, 4)}</pre></h3>
			</div>
			<div>
				<h3>Website Storage Usage Info:<br /><pre style={{textAlign: "left"}}>{JSON.stringify(storageUsageInfo, null, 4)}</pre></h3>
			</div>
		</div>
	)
}