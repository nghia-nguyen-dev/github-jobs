import { useState, useEffect } from "react";
import globeIcon from "assets/icons/globe.svg";
import * as R from "ramda";

export default () => {
	return (
		<div className="App">
			<h1>Github Jobs</h1>
			<Banner />
			<JobsList />
		</div>
	);
};

const JobCard = () => {
	return (
		<div>
			<img />
			<div>
				<p>Kasisto</p>
				<p>Front-End Software Engineer</p>
				<p>Full time</p>
			</div>
			<div>
				<div>
					<img />
					<p>New York</p>
				</div>
				<div>
					<img />
					<p>5 days ago</p>
				</div>
			</div>
		</div>
	);
};

const PostDate = () => {
	// some math operation to get num of days from the time it was posted

	return (
		<div>
			<img />
			<p>5 days ago</p>
		</div>
	);
};

const Fulltime = () => {
	return (
		<div>
			<input type="checkbox" id="Fulltime" name="Fulltime" />
			<label for="Fulltime">Fulltime</label>
		</div>
	);
};

const Location = () => {
	return (
		<section>
			<h3>Location</h3>
			<div>
				<i></i>
				<input></input>
			</div>
		</section>
	);
};

const JobsList = () => {
	const [jobs, setJobs] = useState([]); // chunked into groups of 5
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoadig, setIsLoading] = useState(false); // anthing that fetchs data will need loading state

	const allOrigins = `https://api.allorigins.win/raw?url=`;
	const config = {
		jobsPerPage: 5,
	};

	useEffect(() => {
		fetch(
			`${allOrigins}https://jobs.github.com/positions.json?page=1&search=code`
		)
			.then((res) => res.json())
			.then((data) => {
				R.pipe(R.splitEvery(config.jobsPerPage), setJobs)(data);
			});
	}, []);

	const renderedList = jobs[currentPage]?.map(
		({ company_logo, company, title, type, location, created_at }) => {
			return (
				<li className="JobCard">
					<img className="JobCard__company-logo" src={company_logo} />
					<div>
						<p>{company}</p>
						<p>{title}</p>
						<p>{type}</p>
					</div>
					<div className="JobCard__secondary-info">
						<p>{location}</p>
						<p>{created_at}</p>
					</div>
				</li>
			);
		}
	);

	console.log(jobs);
	return <ul>{renderedList}</ul>;
};

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="Search">
			<div className="Search__input-container">
				<img className="Search__globe-icon" src={globeIcon} />
				<input
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
					className="Search__input"
					placeholder="Title, companies, expertise or benefits"
				></input>
			</div>
			<button className="Search__btn">Search</button>
		</div>
	);
};

const Banner = () => {
	return (
		<div className="Banner">
			<Search />
		</div>
	);
};

const Header = () => {
	return <h1>Github Jobs</h1>;
};
