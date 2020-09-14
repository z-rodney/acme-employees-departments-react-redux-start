import React from 'react';
import Employee from './Employee';

const Employees = ({ department, employees, removeFromDepartment, destroyEmployee })=> {
  return (
      <ul>
        {
          employees.filter( employee => employee.departmentId === (department ? department.id : null )).map( employee =>
          <Employee employee={ employee } removeFromDepartment={ removeFromDepartment } destroyEmployee={ destroyEmployee } key={ employee.id }/>)
        }
      </ul>
  );
};

export default Employees;
