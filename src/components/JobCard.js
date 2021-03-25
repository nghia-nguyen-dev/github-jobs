import CompanyLogo from "components/CompanyLogo";
import CompanyName from "components/CompanyName";
import JobType from "components/JobType";
import Location from "components/Location";
import PostDate from "components/PostDate";

const JobCard = ({
	setCurrentJob,
	job: { company_logo, company, title, type, location, created_at },
	job,
}) => {
	const handleClick = () => {
		setCurrentJob(job);
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	return (
		<li className="JobCard" onClick={handleClick}>
			<CompanyLogo company_logo={company_logo} className="reg" />
			<div className="JobCard__primary-info">
				<CompanyName company={company} className="sm" />
				<h2>{title}</h2>
				<JobType type={type} />
			</div>
			<div className="JobCard__secondary-info">
				<Location location={location} />
				<PostDate created_at={created_at} />
			</div>
		</li>
	);
};

export default JobCard;
