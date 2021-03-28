export const filterByType = isFullTime => jobs =>
	isFullTime ? jobs.filter(job => job.type === "Full Time") : jobs;

export const filterByLocation = inputLocation => jobs =>
	jobs.filter(job =>
		job.location.toLowerCase().includes(inputLocation.toLowerCase())
	);

export const daysSincePost = created_at => {
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
		.then(res => res.json())
		.then(data => JSON.parse(data.contents))
		.then(jobs => setJobs(jobs))
		.catch(err => {
			console.log(err);
		});
};
