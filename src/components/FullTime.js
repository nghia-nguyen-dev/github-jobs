const FullTime = ({ fullTime, setFullTime }) => {
	const handleCheckbox = (e) => {
		setFullTime(e.target.checked);
	};

	return (
		<div className="FullTime">
			<input
				className="FullTime__checkbox"
				type="checkbox"
				id="Fulltime"
				checked={fullTime}
				onChange={handleCheckbox}
			/>
			<label htmlFor="Fulltime">Fulltime</label>
		</div>
	);
};

export default FullTime;