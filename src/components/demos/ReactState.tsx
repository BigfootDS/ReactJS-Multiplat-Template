import { useEffect, useState } from "react";

export default function ReactStateDemo() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log("Count is now: " + count);
	}, [count])

	return (
		<div className="card reactState">
			<button onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</button>
			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>
		</div>
	);
}
