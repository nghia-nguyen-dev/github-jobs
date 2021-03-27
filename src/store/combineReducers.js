import {combineReducers} from 'redux'
import filtersReducer from './filters'
import jobsReducer from 'store/jobs'

const rootReducer = combineReducers({
    filters: filtersReducer,
    jobs: jobsReducer,
})

export default rootReducer