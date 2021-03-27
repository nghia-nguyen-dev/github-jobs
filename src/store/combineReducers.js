import {combineReducers} from 'redux'
import filtersReducer from 'store/filters'
import jobsReducer from './jobs'

const rootReducer = combineReducers({
    filters: filtersReducer,
    jobs: jobsReducer,
})

export default rootReducer