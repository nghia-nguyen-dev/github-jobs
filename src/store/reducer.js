const init = {
	filters: {
		isFullTime: false,
		location: "",
	},
	jobs: [],
	selectedJob: {},
	currentPage: 0,
	isLoading: false,
};

// REDUCER
const reducer = (state = init, action) => {
	switch (action.type) {
		case "TOGGLE_FULLTIME":
			return {
				...state,
				filters: {
					...state.filters,
					isFullTime: !state.filters.isFullTime,
				},
			};
		case "SET_LOCATION":
			return {
				...state,
				filters: {
					...state.filters,
					location: action.location,
				},
				currentPage: 0,
			};

		case "LOAD_JOBS":
			return {
				...state,
				jobs: action.jobs,
				currentPage: 0,
			};

		case "SELECT_JOB":
			return {
				...state,
				selectedJob: action.job,
			};

		case "CLEAR_JOB":
			return {
				...state,
				selectedJob: {},
			};

		case "CHANGE_PAGE":
			return {
				...state,
				currentPage: state.currentPage + action.num,
			};

		case "SET_PAGE":
			return {
				...state,
				currentPage: action.num,
			};

		case "TOGGLE_LOADING":
			return {
				...state,
				isLoading: !state.isLoading,
			};

		default:
			return state;
	}
};

export default reducer;
