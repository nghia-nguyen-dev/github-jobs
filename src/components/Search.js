import { useState } from "react";
import { useDispatch } from "react-redux";
import workIcon from "assets/icons/work.svg";
import { loadJobs } from "store/actions";
import { useEffect } from "react";

const Search = () => {
	const [searchDescription, setSearchDescription] = useState("");
	const dispatch = useDispatch();

	const fetchData = (searchDescription = "") => {
		fetch(
			`https://api.allorigins.win/get?url=https://jobs.github.com/positions.json?search=${searchDescription}`
		)
			.then(res => res.json())
			.then(data => JSON.parse(data.contents))
			.then(jobs => {
				dispatch(loadJobs(jobs));

				// console.log(addPages);
				// // dispatch(addPages(R.splitEvery(config.jobsPerPage)(jobs)))
				// R.pipe(
				// 	R.splitEvery(config.jobsPerPage),
				// 	addPages,
				// 	dispatch
				// )(jobs)
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchData(searchDescription);
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		fetchData(searchDescription);
	};

	return (
		<div className="Search">
			<form className="Search__form" onSubmit={handleSubmit}>
				<div className="Search__input-container">
					<img className="Search__work-icon" src={workIcon} />
					<input
						onChange={e => setSearchDescription(e.target.value)}
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

export default Search;
