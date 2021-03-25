import { curryfullTimeFilter, curryLocationInput } from "utils/helpers";
import { useState, useEffect } from "react";
import * as R from "ramda";
import config from 'utils/config'
import FullTime from 'components/FullTime'
import LocationInput from 'components/LocationInput'

const Filters = ({ jobs, setPages, setCurrentPage }) => {
	const [location, setLocation] = useState("");
	const [fullTime, setFullTime] = useState(false);

	useEffect(() => {
		const data = localStorage.getItem("full-time");
		if (data) {
			setFullTime(JSON.parse(data));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("full-time", fullTime);
	}, [fullTime]);

	useEffect(() => {
		!R.isEmpty(jobs) &&
			R.pipe(
				curryfullTimeFilter(fullTime, R.__),
				curryLocationInput(location, R.__),
				R.splitEvery(config.jobsPerPage),
				setPages
			)(jobs);
	}, [jobs, fullTime, location]);

	return (
		<div className="Filters">
			<FullTime fullTime={fullTime} setFullTime={setFullTime} />
			<LocationInput
				setLocation={setLocation}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default Filters;
