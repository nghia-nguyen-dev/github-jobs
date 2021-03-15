import { useState, useEffect } from "react";
import globeIcon from "assets/icons/globe.svg"

export default () => {
	return (
		<div className="App">
			<h1>Github Jobs</h1>
			<Banner />
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
	return (
		<ul>
			<JobCard />
			<JobCard />
			<JobCard />
			<JobCard />
			<JobCard />
		</ul>
	);
};

const Search = () => {
	return (
		<div className="Search">
			<div className="Search__input-container">
                <img className="Search__globe-icon" src={globeIcon}/>
				<input
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
