import { toggleFullTime } from "store/actions";
import { useDispatch } from "react-redux";

const FullTime = () => {
	const dispatch = useDispatch();

	const handleCheckbox = (e) => {
		dispatch(toggleFullTime());
	};

	return (
		<div className="FullTime">
			<input
				className="FullTime__checkbox"
				type="checkbox"
				id="Fulltime"
				onChange={handleCheckbox}
			/>
			<label htmlFor="Fulltime">Fulltime</label>
		</div>
	);
};

export default FullTime;
