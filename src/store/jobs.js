// ACTION CREATOR
export const loadJobs = jobs => ({ type: "LOAD_JOBS", jobs });

// REDUCER
const jobsReducer = (state = [], action) => {
	switch (action.type) {
		case "LOAD_JOBS":
			return action.jobs;

		default:
			return state;
	}
};

export default jobsReducer;
