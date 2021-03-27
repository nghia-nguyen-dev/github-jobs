// ACTION CREATOR
export const addJobs = (jobs) => ({ type: "ADD_JOBS", jobs });

// REDUCER
const jobsReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_JOBS":
			return [...state, action.jobs];

		default:
			return state;
	}
};

export default jobsReducer;
