import JobCard from 'components/JobCard'
import {useSelector} from 'react-redux'
import * as R from 'ramda'
import {curryfullTimeFilter, curryLocationInput} from 'utils/helpers'
import config from 'utils/config'

const JobsList = () => {
	const jobs = useSelector(state => state.jobs)
	const fullTime = useSelector(state => state.filters.isFullTime)
	const location = useSelector(state => state.filters.location)

	const pages = R.pipe(
					curryfullTimeFilter(fullTime, R.__),
					curryLocationInput(location, R.__),
					R.splitEvery(config.jobsPerPage),
				)(jobs);


	const renderedList = pages[0]?.map((job) => {
		return <JobCard key={job.id} job={job}  />;
	});

	return <ul className="JobsList">{renderedList}</ul>;
};

export default JobsList