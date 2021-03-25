import chevronLeft from 'assets/icons/chevron_left.svg'
import chevronRight from 'assets/icons/chevron_right.svg'

const PageNav = ({ pages, currentPage, setCurrentPage }) => {
	const handleNext = () => {
		if (currentPage === pages.length - 1) {
			return;
		}
		setCurrentPage((prev) => prev + 1);
	};

	const handlePrev = () => {
		if (currentPage === 0) {
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

export default PageNav