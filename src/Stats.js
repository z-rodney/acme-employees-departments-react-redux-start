import React from 'react';
import { connect } from 'react-redux'

const Stats = ({ employees })=> {
  return (
    <p>{ employees.length } Total Employees</p>
  );
};

export default connect(
  null,
  null
)(Stats);
