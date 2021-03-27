import { createStore } from "redux";
import rootReducer from "./combineReducers";

const store = createStore(rootReducer);
store.subscribe(() => {
	console.log(store.getState());
});

export default store;
