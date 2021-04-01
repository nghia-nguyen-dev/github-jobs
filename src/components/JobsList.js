import JobCard from "components/JobCard";
import { useSelector } from "react-redux";
import * as R from "ramda";
import { filterByType, filterByLocation } from "utils/helpers";
import config from "utils/config";
import BeatLoader from "react-spinners/BeatLoader";

const JobsList = () => {
	const jobs = useSelector(state => state.jobs);
	const isFullTime = useSelector(state => state.filters.isFullTime);
	const location = useSelector(state => state.filters.location);
	const currentPage = useSelector(state => state.currentPage);
	const isLoading = useSelector(state => state.isLoading);

	const pages = R.pipe(
		filterByType(isFullTime),
		filterByLocation(location),
		R.splitEvery(config.jobsPerPage)
	)(jobs);

	const renderedList = pages[currentPage]?.map(job => {
		return <JobCard key={job.id} job={job} />;
	});

	return (
		<ul className="JobsList">
			<BeatLoader
				margin={4}
				size={20}
				loading={isLoading}
				color={"#1e86ff"}
				css={{
					display: "block",
					margin: "0 auto",
					width: "max-content",
					height: "698px",
					paddingTop: "50%",
				}}
			/>
			{renderedList}
		</ul>
	);
};

export default JobsList;
