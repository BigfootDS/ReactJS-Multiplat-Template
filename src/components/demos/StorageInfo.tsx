import { useEffect } from "react";
import { sqlocalDb } from "../../utils/database/db";

export default function StorageInfo(){

	useEffect(() => {
		const getDbInfo = async () => {
		  let infoData = await sqlocalDb.getDatabaseInfo();
		  let infoContainerElem = document.getElementById("dbInfoContainer")
		  if (infoContainerElem){
			infoContainerElem.innerText = JSON.stringify(infoData, null, 4);
		  }

		  navigator.storage.estimate().then((estimate) => {
			let storageEstimateContainerElem = document.getElementById("storageEstimateContainer");
			let quotaMb = estimate.quota ? (estimate.quota / 1024 / 1024).toFixed(2) : "unknown";
			let usageMb = estimate.usage ? (estimate.usage / 1024 / 1024).toFixed(2) : "unknown";
			if (storageEstimateContainerElem){
				storageEstimateContainerElem.innerText = `Estimated storage usage data: ${JSON.stringify({
					quota: quotaMb,
					usage: usageMb,
					usagePercent: (((estimate.usage || 100) / (estimate.quota || 100)) * 100).toFixed(6) + "%"
				}, null, 4)}`
			}
		  })
		}
		getDbInfo();
	  }, []);

	return(
		<div className="card storageInfo">
			<p id="storageEstimateContainer"></p>
			<p id="dbInfoContainer"></p>

		</div>
	)
}