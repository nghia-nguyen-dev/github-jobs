const JobType = ({ type, className }) => {
	return <p className={`JobType JobType--${className}`}>{type}</p>;
};

export default JobType;
