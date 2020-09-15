import React from 'react';
import { connect } from 'react-redux'
import { removeEmployeeDepartment } from './store'

const Employee = (props //{ employee, destroyEmployee, removeFromDepartment }
  )=> {
    const { name, id } = props
  return (
    <li key={ id }>
      { name }
      <button onClick={ ()=> destroyEmployee(employee)}>x</button>
      {
        //!!removeFromDepartment &&
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeEmployeeDepartment: function(employee){
      dispatch(removeEmployeeDepartment(employee));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee);
