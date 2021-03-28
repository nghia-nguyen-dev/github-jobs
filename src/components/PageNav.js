import chevronLeft from "assets/icons/chevron_left.svg";
import chevronRight from "assets/icons/chevron_right.svg";
import { useDispatch, useSelector } from "react-redux";
import { changePage, setPage } from "store/actions";
import { range } from "ramda";

const PageNav = ({}) => {
	const dispatch = useDispatch();
	const jobs = useSelector(state => state.jobs);
	const currentPage = useSelector(state => state.currentPage);

	const handleNext = () => {
		if (currentPage === pages.length - 1) {
			return;
		}
		dispatch(changePage(1));
	};

	const handlePrev = () => {
		if (currentPage === 0) {
			return;
		}
		dispatch(changePage(-1));
	};

	const handleClick = index => {
		dispatch(setPage(index));
	};

	const pages = range(0, jobs.length / 5);

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

export default PageNav;
