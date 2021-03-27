import {createStore} from 'redux'
import filtersReducer from 'store/filters'

const store = createStore(filtersReducer)
store.subscribe(() => {
    console.log(store.getState())
})

export default store