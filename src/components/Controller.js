import { useState, useEffect } from "react";
import { fetchData } from "utils/helpers";
import Banner from "components/Banner";
import Search from "components/Search";
import Filters from "components/Filters";
import JobsView from "components/JobsView";

const Controller = ({ setCurrentJob }) => {
	const [jobs, setJobs] = useState([]);
	const [pages, setPages] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		const data = localStorage.getItem("current-page");
		setCurrentPage(JSON.parse(data));
	}, []);

	useEffect(() => {
		localStorage.setItem("current-page", currentPage);
	}, [currentPage]);

	useEffect(() => {
		fetchData(setJobs);
	}, []);

	return (
		<div className="Controller">
			<Banner>
				<Search setJobs={setJobs} />
			</Banner>
			<Filters
				jobs={jobs}
				setPages={setPages}
				setCurrentPage={setCurrentPage}
			/>
			<JobsView
				pages={pages}
				setCurrentJob={setCurrentJob}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default Controller;
