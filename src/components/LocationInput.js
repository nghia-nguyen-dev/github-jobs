import { useState, useEffect } from "react";
import globeIcon from "assets/icons/globe.svg";

const LocationInput = ({ setLocation, setCurrentPage }) => {
	const [input, setInput] = useState(null);

	useEffect(() => {
		if (input !== null) {
			const timeoutId = setTimeout(() => {
				setLocation(input);
				setCurrentPage(0);
			}, 500);

			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [input]);

	return (
		<div className="LocationInput">
			<label className="LocationInput__label">Location</label>
			<div className="LocationInput__input-container">
				<img className="LocationInput__globe-icon" src={globeIcon} />
				<input
					className="LocationInput__input"
					placeholder="City, state, or country"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default LocationInput;
