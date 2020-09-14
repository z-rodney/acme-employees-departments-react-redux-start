import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'

//ACTION TYPES
const FIRE_EMPLOYEE = 'FIRE_EMPLOYEE'
const REMOVE_DEPARTMENT = 'REMOVE DEPARTMENT'

//ACTION CREATORS
const fireEmployee = () => ({
  type: FIRE_EMPLOYEE
})
const removeDepartment = () => ({
  type: REMOVE_DEPARTMENT
})

//INITIAL STATE
const initialState = {
  employees: [],
  departments: []
}

//REDUCER FUNCTION
function reducer (state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
  )

export default store
