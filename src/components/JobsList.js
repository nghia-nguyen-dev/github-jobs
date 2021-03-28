import JobCard from "components/JobCard";
import { useSelector } from "react-redux";
import * as R from "ramda";
import { filterByType, filterByLocation } from "utils/helpers";
import config from "utils/config";

const JobsList = () => {
	const jobs = useSelector(state => state.jobs);
	const isFullTime = useSelector(state => state.filters.isFullTime);
	const location = useSelector(state => state.filters.location);
	const currentPage = useSelector(state => state.currentPage);

	const pages = R.pipe(
		filterByType(isFullTime),
		filterByLocation(location),
		R.splitEvery(config.jobsPerPage)
	)(jobs);

	const renderedList = pages[currentPage]?.map(job => {
		return <JobCard key={job.id} job={job} />;
	});

	return <ul className="JobsList">{renderedList}</ul>;
};

export default JobsList;
