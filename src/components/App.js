import { useState } from "react";
import * as R from "ramda";
import JobPage from "components/JobPage";
import Header from "components/Header";
import Controller from "components/Controller";

export default () => {
	const [currentJob, setCurrentJob] = useState({});
	const renderView = R.isEmpty(currentJob) ? (
		<>
			<Header />
			<Controller setCurrentJob={setCurrentJob} />
		</>
	) : (
		<JobPage currentJob={currentJob} setCurrentJob={setCurrentJob} />
	);

	return <div className="App">{renderView}</div>;
};
