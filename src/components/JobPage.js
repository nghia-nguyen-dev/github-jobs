import DOMPurify from "dompurify";
import Header from "components/Header";
import Back from "components/Back";
import JobType from "components/JobType";
import PostDate from "components/PostDate";
import CompanyLogo from "components/CompanyLogo";
import CompanyName from "components/CompanyName";
import Location from "components/Location";
import {useSelector} from 'react-redux'

const JobPage = () => {
	const {
		title,
		type,
		created_at,
		company_logo,
		company,
		location,
		description,
		how_to_apply,
	} = useSelector(state => state.selectedJob);

	return (
		<div className="JobPage">
			<Header className="JobPage__header" />
			<div className="JobPage__contact">
				<Back setCurrentJob={setCurrentJob} />
				<h4>How to apply</h4>
				<p
					className="JobPage__contact"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(how_to_apply),
					}}
				></p>
			</div>
			<div className="JobPage__job-description">
				<div className="JobPage__header-content">
					<div className="JobPage__flex-grp">
						<h2 className="JobPage__title">{title}</h2>
						<JobType type={type} className="JobPage" />
					</div>
					<PostDate created_at={created_at} className="JobPage" />
				</div>
				<div className="JobPage__company">
					<CompanyLogo company_logo={company_logo} className="sm" />
					<div>
						<CompanyName company={company} className="reg" />
						<Location location={location} />
					</div>
				</div>
				<div
					className="JobPage__description"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(description),
					}}
				/>
			</div>
		</div>
	);
};

export default JobPage;
