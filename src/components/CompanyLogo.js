const CompanyLogo = ({ company_logo, className }) => {
	return (
		<img
			className={`CompanyLogo CompanyLogo--${className}`}
			src={company_logo}
		/>
	);
};

export default CompanyLogo;
