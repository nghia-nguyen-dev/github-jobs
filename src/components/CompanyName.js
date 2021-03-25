const CompanyName = ({ company, className }) => {
	return (
		<h3 className={`CompanyName CompanyName--${className}`}>{company}</h3>
	);
};

export default CompanyName;
