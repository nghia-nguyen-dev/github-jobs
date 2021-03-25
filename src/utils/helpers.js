import * as R from 'ramda'

export const curryfullTimeFilter = R.curry((fullTime, jobs) => {
	if (fullTime) {
		return jobs.filter((job) => job.type === "Full Time");
	}
	return jobs;
});

export const curryLocationInput = R.curry((city, jobs) => {
	if (!R.isEmpty(city)) {
		return jobs.filter((job) =>
			job.location.toLowerCase().includes(city.toLowerCase())
		);
	}
	return jobs;
});

export const daysSincePost = (created_at) => {
	const postDate = new Date(created_at);
	const todaysDate = new Date();

	// time difference
	var timeDiff = Math.abs(todaysDate.getTime() - postDate.getTime());

	// days difference
	return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const fetchData = (setJobs, searchDescription = "") => {
	fetch(
		`https://api.allorigins.win/get?url=https://jobs.github.com/positions.json?search=${searchDescription}`
	)
		.then((res) => res.json())
		.then((data) => JSON.parse(data.contents))
		.then((jobs) => setJobs(jobs))
		.catch((err) => {
			console.log(err);
		});
};
