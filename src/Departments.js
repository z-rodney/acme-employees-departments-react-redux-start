import React from 'react';
import Department from './Department';
import { connect } from 'react-redux'

const Departments = (props)=> {
  const { departments } = props
  return (
    <ul className='departments'>
      <Department/>
      { departments.map( department => {
          return (
            <Department
              departmentId = { department.id }
              key = { department.id }
            />
          );
        })
      }
    </ul>
  );
}
const mapStateToProps = (state) => {
  const { departments } = state
  return { departments }
}

export default connect(mapStateToProps)(Departments);
