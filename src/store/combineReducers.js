import {combineReducers} from 'redux'
import filtersReducer from 'store/filters'
import jobsReducer from './jobs'
import pageReducer from './page'

const rootReducer = combineReducers({
    filters: filtersReducer,
    jobs: jobsReducer,
    page: pageReducer
})

export default rootReducer