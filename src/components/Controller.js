import Banner from "components/Banner";
import Search from "components/Search";
import Filters from "components/Filters";
import JobsView from "components/JobsView";

const Controller = () => {
	return (
		<div className="Controller">
			<Banner>
				<Search />
			</Banner>
			<Filters />
			<JobsView />
		</div>
	);
};

export default Controller;
