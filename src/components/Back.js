import arrowLeft from "assets/icons/left_arrow.svg";


const Back = ({ setCurrentJob }) => {
	const handleClick = () => {
		setCurrentJob({});
	};

	return (
		<div onClick={handleClick} className="Back">
			<img src={arrowLeft} className="Back__arrow" />
			<p>Back to search</p>
		</div>
	);
};

export default Back;