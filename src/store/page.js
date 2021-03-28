const init = {
    current: 0,
    amount: 0,
}

// ACTION CREATOR
export const addPages = pages => ({ type: "ADD_PAGES", pages });
export const changePage = num => ({ type: "CHANGE_PAGE", num });

// REDUCER
const pageReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_PAGES":
			return {
                ...state,
                amount: action.pages
            }

        case "CHANGE_PAGE":
            return {
                ...state,
                current: state.current + action.num
            }

		default:
			return state;
	}
};

export default pageReducer;
