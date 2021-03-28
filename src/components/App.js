import * as R from "ramda";
import JobPage from "components/JobPage";
import Header from "components/Header";
import Controller from "components/Controller";
import { useSelector } from "react-redux";

export default () => {
	const selectedJob = useSelector(state => state.selectedJob);

	const renderView = R.isEmpty(selectedJob) ? (
		<>
			<Header />
			<Controller />
		</>
	) : (
		<JobPage />
	);

	return <div className="App">{renderView}</div>;
};
