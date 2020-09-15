/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux'
import { removeEmployeeDepartment, fireEmployee } from './store'

const Employee = (props //{ employee, destroyEmployee, removeFromDepartment }
  )=> {
    const { name, id } = props
  return (
    <li key={ id }>
      { name }
      <button onClick={ ()=> props.fireEmployee(id)}>x</button>
      {
        !!props.removeEmployeeDepartment &&
        (
          <button onClick={ ()=> props.removeEmployeeDepartment(id)}>Remove From Department</button>
        )
      }
    </li>
  );
};

const mapStateToProps = (state, ownProps) => {
  const currentEmployee = state.employees.find(employee => employee.id === ownProps.employee.id)
  return currentEmployee
}

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.employee.departmentId) {
    return {
      removeEmployeeDepartment: function(employeeId){
        dispatch(removeEmployeeDepartment(employeeId));
      },
      fireEmployee: function(employeeId){
        dispatch(fireEmployee(employeeId))
      }
    }
  } else {
    return {
      fireEmployee: function(employeeId){
        dispatch(fireEmployee(employeeId))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee);
