import React from 'react';
import { connect } from 'react-redux'

const Stats = (props)=> {
  return (
    <p>{ props.length } Total Employees</p>
  );
};

const mapStateToProps = (state) => {
  const length = state.employees.length
  return {
    length
  }
}

export default connect(mapStateToProps)(Stats);
