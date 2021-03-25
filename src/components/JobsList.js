import JobCard from 'components/JobCard'

const JobsList = ({ pages, currentPage, setCurrentJob }) => {
	const renderedList = pages[currentPage]?.map((job) => {
		return <JobCard key={job.id} job={job} setCurrentJob={setCurrentJob} />;
	});

	return <ul className="JobsList">{renderedList}</ul>;
};

export default JobsList