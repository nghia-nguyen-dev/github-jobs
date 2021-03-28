// FILTERS
export const toggleFullTime = () => ({ type: "TOGGLE_FULLTIME" });
export const setLocation = location => ({ type: "SET_LOCATION", location });

// JOBS
export const loadJobs = jobs => ({ type: "LOAD_JOBS", jobs });
export const selectJob = job => ({type: "SELECT_JOB", job})
export const clearJob = () => ({type: 'CLEAR_JOB'})

// PAGE NAV
export const changePage = num => ({ type: "CHANGE_PAGE", num });
export const setPage = num => ({ type: "SET_PAGE", num })