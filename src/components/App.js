import { useState, useEffect } from "react";
import globeIcon from "assets/icons/globe.svg";
import * as R from "ramda";
import mockData from "utils/mockData.json";
import chevronLeft from 'assets/icons/chevron_left.svg'
import chevronRight from 'assets/icons/chevron_right.svg'
import dots from 'assets/icons/dots.svg'

export default () => {
	return (
		<div className="App">
			<h1>Github Jobs</h1>
			<Banner />
			<JobsList />
			<PageNav />
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
	const [isLoading, setIsLoading] = useState(false); // anthing that fetchs data will need loading state

	const CORS = `https://cors-anywhere.herokuapp.com/`;
	const config = {
		jobsPerPage: 5,
	};

	useEffect(() => {
		// // isLoading: true
		// fetch(
		// 	`${CORS}https://jobs.github.com/positions.json?search=developer`
		// )
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		R.pipe(R.splitEvery(config.jobsPerPage), setJobs)(data);
		// 		// isLoading: false
		// 	})
		// 	.catch((err) => console.log(err));

		setIsLoading(true);
		R.pipe(R.splitEvery(config.jobsPerPage), setJobs)(mockData);
		setIsLoading(false);
	}, []);

	const renderedList = jobs[currentPage]?.map(
		({ company_logo, company, title, type, location, created_at, id }) => {
			return (
				<li className="JobCard" key={id}>
					<img className="JobCard__company-logo" src={company_logo} />
					<div className="JobCard__primary-info">
						<p className="JobCard__company">{company}</p>
						<p>{title}</p>
						<p className="JobCard__type">{type}</p>
					</div>
					<div className="JobCard__secondary-info">
						<p>{location}</p>
						<p>{created_at}</p>
					</div>
				</li>
			);
		}
	);

	return <ul>{renderedList}</ul>;
};

const PageNav = ({currentPage, jobs}) => {
	return (
		<div className="PageNav">
			<img src={chevronLeft} className="PageNav__icon" />
			<div className="PageNav__number"><span>1</span></div>
			<div className="PageNav__number"><span>2</span></div>
			<img src={dots} className="PageNav__icon" />
			<div className="PageNav__number"><span>{jobs.length}</span></div>
			<img src={chevronRight} className="PageNav__icon" />
		</div>
	);
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
