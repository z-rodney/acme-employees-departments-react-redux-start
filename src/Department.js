import React from 'react';
import Employees from './Employees';
import { connect } from 'react-redux'

const Department = ( props )=> {
  const { department, numberOfEmployees } = props;
    return (
      <li>
        <span className='department-title'>
          { department ? department.name : 'No Department' } ({numberOfEmployees})
        </span>
        {<Employees departmentId={ department ? department.id : null} />}
      </li>
    );
};

const mapStateToProps = (state, ownProps) => {
  const department = state.departments.find(department => department.id === ownProps.departmentId)
  const numberOfEmployees = state.employees.filter(employee => department ?
    (employee.departmentId === department.id) :
    !employee.departmentId
  ).length
  return {
    department,
    numberOfEmployees
  }
}

export default connect(mapStateToProps)(Department);
