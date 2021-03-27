// INIT
const init = {
	isFullTime: false,
	location: "",
};

// ACTION CREATOR
export const toggleFullTime = () => ({ type: "TOGGLE_FULLTIME" });
export const setLocation = (location) => ({ type: "SET_LOCATION", location });

// REDUCER
const filtersReducer = (state = init, action) => {
	switch (action.type) {
		case "TOGGLE_FULLTIME":
			return {
				...state,
				isFullTime: !state.isFullTime,
			};
		case "SET_LOCATION":
			return {
				...state,
				location: action.location,
			};

		default:
			return state;
	}
};

export default filtersReducer