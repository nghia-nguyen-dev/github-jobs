import { useState } from 'react'
import {fetchData} from 'utils/helpers'
import workIcon from 'assets/icons/work.svg'

const Search = ({ setJobs }) => {
	const [searchDescription, setSearchDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData(setJobs, searchDescription);
	};

	return (
		<div className="Search">
			<form className="Search__form" onSubmit={handleSubmit}>
				<div className="Search__input-container">
					<img className="Search__work-icon" src={workIcon} />
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

export default Search