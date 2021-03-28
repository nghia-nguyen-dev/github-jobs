import arrowLeft from "assets/icons/left_arrow.svg";
import { clearJob } from "store/actions";
import { useDispatch } from "react-redux";

const Back = () => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(clearJob());
	};

	return (
		<div onClick={handleClick} className="Back">
			<img src={arrowLeft} className="Back__arrow" />
			<p>Back to search</p>
		</div>
	);
};

export default Back;
