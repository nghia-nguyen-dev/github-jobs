import { useState, useEffect, useRef } from "react";
import globeIcon from "assets/icons/globe.svg";
import workIcon from "assets/icons/work.svg";
import clockIcon from "assets/icons/clock.svg";
import * as R from "ramda";
import mockData from "utils/mockData.json";
import chevronLeft from "assets/icons/chevron_left.svg";
import chevronRight from "assets/icons/chevron_right.svg";
import dots from "assets/icons/dots.svg";
import DOMPurify from "dompurify";
import arrowLeft from "assets/icons/left_arrow.svg";

const config = {
	jobsPerPage: 5,
};

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

const Back = ({ setCurrentJob }) => {
	const handleClick = () => {
		setCurrentJob({});
	};

	return (
		<div onClick={handleClick} className="Back">
			<img src={arrowLeft} className="Back__arrow" />
			<p>Back to search</p>
		</div>
	);
};

const JobPage = ({
	currentJob: {
		title,
		type,
		created_at,
		company_logo,
		company,
		location,
		description,
		how_to_apply,
	},
	setCurrentJob,
}) => {
	return (
		<div className="JobPage">
			<Header className="JobPage__header" />
			<div className="JobPage__contact">
				<Back setCurrentJob={setCurrentJob} />
				<h4>How to apply</h4>
				<p
					className="JobPage__contact"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(how_to_apply),
					}}
				></p>
			</div>
			<div className="JobPage__job-description">
				<div className="JobPage__header-content">
					<div className="JobPage__flex-grp">
						<h2 className="JobPage__title">{title}</h2>
						<JobType type={type} className="JobPage" />
					</div>
					<PostDate created_at={created_at} className="JobPage" />
				</div>
				<div className="JobPage__company">
					<CompanyLogo company_logo={company_logo} className="sm" />
					<div>
						<CompanyName company={company} className="reg" />
						<Location location={location} />
					</div>
				</div>
				<div
					className="JobPage__description"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(description),
					}}
				/>
			</div>
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

const Filters = ({ jobs, setPages, setCurrentPage }) => {
	const [city, setCity] = useState("");
	const [fullTime, setFullTime] = useState(false);

	useEffect(() => {
		setCurrentPage(0);
		if (!R.isEmpty(jobs)) {
			let temp = [...jobs];

			if (fullTime) {
				temp = temp.filter((job) => job.type === "Full Time");
			}

			if (!R.isEmpty(city)) {
				temp = temp.filter((job) =>
					job.location.toLowerCase().includes(city.toLowerCase())
				);
			}

			R.pipe(R.splitEvery(config.jobsPerPage), setPages)(temp);
		}
	}, [jobs, fullTime, city]);

	return (
		<div className="Filters">
			<FullTime fullTime={fullTime} setFullTime={setFullTime} />
			<LocationFilter setCity={setCity} />
			{/* <Cities setCity={setCity} /> */}
		</div>
	);
};

const Controller = ({ setCurrentJob }) => {
	const [jobs, setJobs] = useState([]);
	const [pages, setPages] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

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

const JobsView = ({ pages, setCurrentJob, currentPage, setCurrentPage }) => {
	return (
		<div className="JobsView">
			<JobsList
				pages={pages}
				currentPage={currentPage}
				setCurrentJob={setCurrentJob}
			/>
			<PageNav
				pages={pages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

const JobsList = ({ pages, currentPage, setCurrentJob }) => {
	const renderedList = pages[currentPage]?.map((job) => {
		return <JobCard key={job.id} job={job} setCurrentJob={setCurrentJob} />;
	});

	return <ul className="JobsList">{renderedList}</ul>;
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

const Cities = ({ setCity }) => {
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

const LocationFilter = ({ setCity }) => {
	const [location, setLocation] = useState("");

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setCity(location);
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [location]);

	return (
		<div className="LocationFilter">
			<label className="LocationFilter__label">Location</label>
			<div className="LocationFilter__input-container">
				<img className="LocationFilter__globe-icon" src={globeIcon} />
				<input
					className="LocationFilter__input"
					placeholder="City, state, or country"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>
			</div>
		</div>
	);
};

const daysSincePost = (created_at) => {
	const postDate = new Date(created_at);
	const todaysDate = new Date();

	// time difference
	var timeDiff = Math.abs(todaysDate.getTime() - postDate.getTime());

	// days difference
	return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const JobType = ({ type, className }) => {
	return <p className={`JobType JobType--${className}`}>{type}</p>;
};

const JobCard = ({
	setCurrentJob,
	job: { company_logo, company, title, type, location, created_at },
	job,
}) => {
	const handleClick = () => {
		setCurrentJob(job);
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	return (
		<li className="JobCard" onClick={handleClick}>
			<CompanyLogo company_logo={company_logo} className="reg" />
			<div className="JobCard__primary-info">
				<CompanyName company={company} className="sm" />
				<h2>{title}</h2>
				<JobType type={type} />
			</div>
			<div className="JobCard__secondary-info">
				<Location location={location} />
				<PostDate created_at={created_at} />
			</div>
		</li>
	);
};

const CompanyName = ({ company, className }) => {
	return (
		<h3 className={`CompanyName CompanyName--${className}`}>{company}</h3>
	);
};

const CompanyLogo = ({ company_logo, className }) => {
	return (
		<img
			className={`CompanyLogo CompanyLogo--${className}`}
			src={company_logo}
		/>
	);
};

const Location = ({ location }) => {
	return (
		<div className="Location">
			<img className="Location__globe-icon" src={globeIcon} />
			<p>{location}</p>
		</div>
	);
};

const PostDate = ({ created_at, className }) => {
	return (
		<div className={`PostDate PostDate--${className}`}>
			<img className="PostDate__clock-icon" src={clockIcon} />
			<p>{daysSincePost(created_at)} days ago</p>
		</div>
	);
};

// utils
const fetchData = (searchDescription, setJobs) => {
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

const Search = ({ setJobs }) => {
	const [searchDescription, setSearchDescription] = useState("");

	useEffect(() => {
		fetchData(searchDescription, setJobs);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData(searchDescription, setJobs);
	};

	return (
		<div className="Search">
			<form className="Search__form" onSubmit={handleSubmit}>
				<div className="Search__input-container">
					<img className="Search__globe-icon" src={globeIcon} />
					<input
						onChange={(e) => setSearchDescription(e.target.value)}
						value={searchDescription}
						className="Search__input"
						placeholder="Title, companies, expertise or benefits"
					></input>
				</div>
				<button className="Search__btn">Search</button>
			</form>
		</div>
	);
};

const Banner = ({ children }) => {
	return <div className="Banner">{children}</div>;
};

const Header = ({ className }) => {
	return <h1 className={className}>Github Jobs</h1>;
};
