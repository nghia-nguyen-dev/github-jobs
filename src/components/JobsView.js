import JobsList from "components/JobsList";
import PageNav from "components/PageNav";

const JobsView = ({ pages, setCurrentJob, currentPage, setCurrentPage }) => {
	return (
		<div className="JobsView">
			<JobsList
				pages={pages}
				currentPage={currentPage}
				setCurrentJob={setCurrentJob}
			/>
			<PageNav
				pages={pages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default JobsView;
