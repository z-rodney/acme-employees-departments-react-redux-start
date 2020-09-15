/* eslint-disable no-case-declarations */
import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'

//ACTION TYPES
const ADD_ALL_EMPLOYEES = 'ADD_ALL_EMPLOYEES'
const ADD_ALL_DEPARTMENTS = 'ADD_ALL_DEPARTMENTS'
const FIRE_EMPLOYEE = 'FIRE_EMPLOYEE'
const REMOVE_EMPLOYEE_DEPARTMENT = 'REMOVE_EMPLOYEE_DEPARTMENT'

//ACTION CREATORS
//action creators are functions that return actions
//they are created as functions to reduce the likelihood of errors
//that could be introduced if manually entering an action each time
//also reusability
//everything other than the "type" property is the payload of the action
//action creators as functions also make it easier to use diff vals in the payload
export const addAllEmployees = (employees) => ({
  type: ADD_ALL_EMPLOYEES,
  employees
})
export const addAllDepartments = (departments) => ({
  type: ADD_ALL_DEPARTMENTS,
  departments
})
const fireEmployee = () => ({
  type: FIRE_EMPLOYEE
})
export const removeEmployeeDepartment = (id) => ({
  type: REMOVE_EMPLOYEE_DEPARTMENT,
  id
})

//INITIAL STATE
const initialState = {
  employees: [],
  departments: []
}

//REDUCER FUNCTION
function reducer (state = initialState, action) {
  switch(action.type) {
    case ADD_ALL_EMPLOYEES:
      return {...state, employees: [...action.employees]}
    case ADD_ALL_DEPARTMENTS:
      return {...state, departments: [...action.departments]}
    case REMOVE_EMPLOYEE_DEPARTMENT:
      const updatedEmployees = state.employees.map(employee => {
        if (action.id === employee.id) {
          employee.departmentId = null;
        }
        return employee
      })
      return {...state, employees: [...updatedEmployees]}
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
  )

export default store
