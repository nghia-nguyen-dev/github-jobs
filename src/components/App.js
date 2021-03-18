import { useState, useEffect, useRef } from "react";
import globeIcon from "assets/icons/globe.svg";
import workIcon from "assets/icons/work.svg";
import * as R from "ramda";
import mockData from "utils/mockData.json";
import chevronLeft from "assets/icons/chevron_left.svg";
import chevronRight from "assets/icons/chevron_right.svg";
import dots from "assets/icons/dots.svg";

const CORS = `https://cors-anywhere.herokuapp.com/`;
const config = {
	jobsPerPage: 5,
};

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

const FullTime = ({ fullTime, setFullTime }) => {
	const handleCheckbox = (e) => {
		setFullTime(e.target.checked);
	};

	return (
		<div className="FullTime">
			<input
				className="FullTime__checkbox"
				type="checkbox"
				id="Fulltime"
				checked={fullTime}
				onChange={handleCheckbox}
			/>
			<label htmlFor="Fulltime">Fulltime</label>
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
	const [pages, setPages] = useState([]);
	const [fullTime, setFullTime] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // anthing that fetchs data will need loading state

	useEffect(() => {
		let temp = [...jobs];

		// full time filter
		if (fullTime) {
			temp = temp.filter((job) => job.type === "Full Time");
		}
		// location filter

		// output
		R.pipe(R.splitEvery(config.jobsPerPage), setPages)(temp);
	}, [jobs, fullTime]);

	const renderedList = pages[currentPage]?.map((job) => {
		return <JobCard key={job.id} job={job} setCurrentJob={setCurrentJob} />;
	});

	return (
		<div className="Controller">
			<Banner>
				<Search setJobs={setJobs} setIsLoading={setIsLoading} />
			</Banner>
			<Filters>
				<FullTime fullTime={fullTime} setFullTime={setFullTime} />
				<SearchLocation setJobs={setJobs} setIsLoading={setIsLoading} />
				<Cities setJobs={setJobs}/>
			</Filters>
			<JobsList>{renderedList}</JobsList>
			<PageNav
				pages={pages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

const Cities = ({setJobs}) => {
	const [city, setCity] = useState("");

	useEffect(() => {
		console.log(mockData)
		const filter = mockData.filter(data => R.includes(city, data.location));
		console.log(filter)
		setJobs(filter)
	},[city]);

	const handleSelect = (e) => {
		setCity(e.target.value);
	};

	return (
		<div className="Cities" onChange={handleSelect}>
			<div>
				<input
					className="Cities__input"
					type="radio"
					value="Boston"
					name="city"
				/>{" "}
				Boston
			</div>
			<div>
				<input
					className="Cities__input"
					type="radio"
					value="Chicago"
					name="city"
				/>{" "}
				Chicago
			</div>
			<div>
				<input
					className="Cities__input"
					type="radio"
					value="Toronto"
					name="city"
				/>{" "}
				Toronto
			</div>
			<div>
				<input
					className="Cities__input"
					type="radio"
					value="Berlin"
					name="city"
				/>{" "}
				Berlin
			</div>
		</div>
	);
};

const SearchLocation = ({ setJobs, setIsLoading }) => {
	const [location, setLocation] = useState("");

	useEffect(() => {
		if (!R.isEmpty(location)) {
			const timeoutId = setTimeout(() => {
				console.log(`fetching data...`);
			}, 500);

			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [location]);

	return (
		<div className="SearchLocation">
			<label className="SearchLocation__label">Location</label>
			<div className="SearchLocation__input-container">
				<img className="SearchLocation__globe-icon" src={globeIcon} />
				<input
					className="SearchLocation__input"
					placeholder="City, state, zip code or country"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>
			</div>
		</div>
	);
};

const Filters = ({ children }) => {
	return <div className="Filters">{children}</div>;
};

const JobsList = ({ children }) => {
	return <ul className="JobsList">{children}</ul>;
};

const JobCard = ({
	setCurrentJob,
	job: { company_logo, company, title, type, location, created_at },
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
		<li className="JobCard" onClick={() => setCurrentJob(job)}>
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

const PageNav = ({ pages, currentPage, setCurrentPage }) => {
	const handleNext = () => {
		if (currentPage === pages.length - 1) {
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

	const PageBlocks = pages.map((job, index) => {
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

const Search = ({ setJobs, setIsLoading }) => {
	const [searchDescription, setSearchDescription] = useState("developer");
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		// setIsLoading(true);
		// fetch(`${CORS}https://jobs.github.com/positions.json?search=${searchDescription}`)
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
		setJobs(mockData);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (submit === true) {
			setIsLoading(true);
			R.pipe(R.splitEvery(config.jobsPerPage), setJobs)(mockData);
			setIsLoading(false);
			setSubmit((prevState) => !prevState);
		}
	}, [submit]);

	return (
		<div className="Search">
			<div className="Search__input-container">
				<img className="Search__globe-icon" src={globeIcon} />
				<input
					onChange={(e) => setSearchDescription(e.target.value)}
					value={searchDescription}
					className="Search__input"
					placeholder="Title, companies, expertise or benefits"
				></input>
			</div>
			<button
				onClick={() => setSubmit((prevState) => !prevState)}
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
