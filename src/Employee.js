/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { removeEmployeeDepartment, fireEmployee } from './store'

class Employee extends React.Component {
  constructor(){
    super();
    this.destroyEmployee = this.destroyEmployee.bind(this);
    this.removeFromDepartment = this.removeFromDepartment.bind(this);
  }

  async destroyEmployee(employeeId){
    try {
      await axios.delete(`/api/employees/${employeeId}`);
      this.props.fireEmployee(employeeId)
    } catch(err) {
      console.log(err)
    }
  }

  async removeFromDepartment(employeeId){
    try {
      await axios.put(`/api/employees/${employeeId}`, { departmentId: null})
      this.props.removeEmployeeDepartment(employeeId)
    } catch(err) {
      console.log(err)
    }
  }

  render(){
    const { name, id } = this.props
    return (
      <li key={ id }>
        { name }
        <button onClick={ ()=> this.destroyEmployee(id)}>x</button>
        {
          !!this.props.departmentId && (
          <button onClick={ ()=> this.removeFromDepartment(id)}>Remove From Department</button>
          )
        }
      </li>
      );
    }
}


const mapStateToProps = (state, ownProps) => {
  const currentEmployee = state.employees.find(employee => employee.id === ownProps.employeeId)
  return currentEmployee
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeEmployeeDepartment: function(employeeId){
      dispatch(removeEmployeeDepartment(employeeId));
    },
    fireEmployee: function(employeeId){
      dispatch(fireEmployee(employeeId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee);
