/* eslint-disable react/prop-types */
import React from 'react';
import Employee from './Employee';
import { connect } from 'react-redux';

const Employees = (props)=> {
  const { employees } = props
  return (
      <ul>
        {
          employees.map( employee =>
          <Employee employeeId={ employee.id } key={ employee.id }/>)
        }
      </ul>
  );
};

const mapStateToProps = (state, ownProps) => {
  const employees = state.employees.filter(employee => employee.departmentId === ownProps.departmentId)
  return {
    employees
  }
}

export default connect(mapStateToProps)(Employees);
