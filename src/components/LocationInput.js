import { useState, useEffect } from "react";
import globeIcon from "assets/icons/globe.svg";
import {setLocation} from 'store/filters'
import {useDispatch, useSelector} from 'react-redux'


const LocationInput = () => {
	const dispatch = useDispatch()
	const input = useSelector(state => state.location)
	// const [input, setInput] = useState(null);

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

	const handleInput = (e) => {
		dispatch(setLocation(e.target.value))
	}

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
