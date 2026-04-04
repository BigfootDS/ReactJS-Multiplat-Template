import { useDeviceData, useMobileOrientation } from "react-device-detect"


export function DeviceInfo(){
	const deviceOrientation = useMobileOrientation();
	const deviceData = useDeviceData(window.navigator.userAgent);

	console.log({orientation: deviceOrientation, device: deviceData});

	return (<div className="deviceInfoComponent">
		<p>OS: {deviceData.os.name}</p>
		<p>Browser: {deviceData.browser.name}</p>
		<p>Orientation: {deviceOrientation.orientation.toLocaleUpperCase()}</p>
	</div>)
}