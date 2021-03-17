import { useState, useEffect, useRef } from "react";
import globeIcon from "assets/icons/globe.svg";
import workIcon from "assets/icons/work.svg";
import * as R from "ramda";
import mockData from "utils/mockData.json";
import chevronLeft from "assets/icons/chevron_left.svg";
import chevronRight from "assets/icons/chevron_right.svg";
import dots from "assets/icons/dots.svg";

export default () => {
	const [currentJob, setCurrentJob] = useState({});
	const renderView = R.isEmpty(currentJob) ? (
		<>
			<h1>Github Jobs</h1>
			<Controller setCurrentJob={setCurrentJob} />
		</>
	) : (
		<JobPage currentJob={currentJob} />
	);

	return <div className="App">{renderView}</div>;
};

const JobPage = () => {
	return <div>Job Page</div>;
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

const Controller = ({ setCurrentJob }) => {
	const [jobs, setJobs] = useState([]); // chunked into groups of 5
	const [currentPage, setCurrentPage] = useState(0);

	const renderedList = jobs[currentPage]?.map((job) => {
		return <JobCard job={job} setCurrentJob={setCurrentJob} />;
	});

	return (
		<div className="Controller">
			<Banner>
				<Search setJobs={setJobs} />
			</Banner>
			<JobsList>{renderedList}</JobsList>
			<PageNav
				jobs={jobs}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

const JobsList = ({ children }) => {
	return <ul>{children}</ul>;
};

const JobCard = ({
	setCurrentJob,
	job: { company_logo, company, title, type, location, created_at, id },
	job,
}) => {
	const daysSincePost = (created_at) => {
		const postDate = new Date(created_at);
		const todaysDate = new Date();

		// time difference
		var timeDiff = Math.abs(todaysDate.getTime() - postDate.getTime());

		// days difference
		return Math.ceil(timeDiff / (1000 * 3600 * 24));
	};

	return (
		<li className="JobCard" key={id} onClick={() => setCurrentJob(job)}>
			<img className="JobCard__company-logo" src={company_logo} />
			<div className="JobCard__primary-info">
				<p className="JobCard__company">{company}</p>
				<p>{title}</p>
				<p className="JobCard__type">{type}</p>
			</div>
			<div className="JobCard__secondary-info">
				<div className="JobCard__location">
					<img className="JobCard__globe-icon" src={globeIcon} />
					<p>{location}</p>
				</div>
				<div className="JobCard__date">
					<img className="JobCard__work-icon" src={workIcon} />
					<p>{daysSincePost(created_at)} days ago</p>
				</div>
			</div>
		</li>
	);
};

const PageNav = ({ jobs, currentPage, setCurrentPage }) => {
	const handleNext = () => {
		if (currentPage === jobs.length - 1) {
			console.log(`last page sir!`);
			return;
		}
		setCurrentPage((prev) => prev + 1);
	};

	const handlePrev = () => {
		if (currentPage === 0) {
			console.log(`first page sir!`);
			return;
		}
		setCurrentPage((prev) => prev - 1);
	};

	const handleClick = (index) => {
		setCurrentPage(index);
	};

	const PageBlocks = jobs.map((job, index) => {
		const isActive = index === currentPage ? "active" : "";

		return (
			<div
				className={`PageNav__number ${isActive}`}
				onClick={() => handleClick(index)}
				key={index}
			>
				<span>{index + 1}</span>
			</div>
		);
	});

	return (
		<div className="PageNav">
			<img
				src={chevronLeft}
				className="PageNav__icon"
				onClick={handlePrev}
			/>
			{PageBlocks}
			<img
				src={chevronRight}
				className="PageNav__icon"
				onClick={handleNext}
			/>
		</div>
	);
};

const Search = ({ setJobs }) => {
	const [searchTerm, setSearchTerm] = useState("developer");
	const [isLoading, setIsLoading] = useState(false); // anthing that fetchs data will need loading state

	const CORS = `https://cors-anywhere.herokuapp.com/`;
	const config = {
		jobsPerPage: 5,
	};

	useEffect(() => {
		// setIsLoading(true);
		// fetch(`${CORS}https://jobs.github.com/positions.json?search=${searchTerm}`)
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		R.pipe(R.splitEvery(config.jobsPerPage), setJobs)(data);
		// 		setIsLoading(false);
		// 	})
		// 	.catch((err) => {
		// 		setIsLoading(false);
		// 		console.log(err);
		// 	});

		setIsLoading(true);
		R.pipe(R.splitEvery(config.jobsPerPage), setJobs)(mockData);
		setIsLoading(false);
	}, []);

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
			<button
				onClick={() => console.log("submit")}
				className="Search__btn"
			>
				Search
			</button>
		</div>
	);
};

const Banner = ({ children }) => {
	return <div className="Banner">{children}</div>;
};

const Header = () => {
	return <h1>Github Jobs</h1>;
};
