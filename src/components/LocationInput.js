import { useState, useEffect } from "react";
import globeIcon from "assets/icons/globe.svg";
import { setLocation } from "store/actions";
import { useDispatch, useSelector } from "react-redux";

const LocationInput = () => {
	const dispatch = useDispatch();
	const input = useSelector(state => state.location);
	let timeoutId = null;

	// useEffect(() => {
	// 	if (input !== null) {
	// 		const timeoutId = setTimeout(() => {
	// 			setLocation(input);
	// 			setCurrentPage(0);
	// 		}, 500);

	// 		return () => {
	// 			clearTimeout(timeoutId);
	// 		};
	// 	}
	// }, [input]);


	const handleInput = e => {
		clearInterval(timeoutId);
		timeoutId = setTimeout(() => {
			dispatch(setLocation(e.target.value));
		}, 400);
	};

	return (
		<div className="LocationInput">
			<label className="LocationInput__label">Location</label>
			<div className="LocationInput__input-container">
				<img className="LocationInput__globe-icon" src={globeIcon} />
				<input
					className="LocationInput__input"
					placeholder="City, state, or country"
					value={input}
					onChange={handleInput}
				/>
			</div>
		</div>
	);
};

export default LocationInput;
