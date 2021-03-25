import globeIcon from 'assets/icons/globe.svg'

const Location = ({ location }) => {
	return (
		<div className="Location">
			<img className="Location__globe-icon" src={globeIcon} />
			<p>{location}</p>
		</div>
	);
};

export default Location;