import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//when using react-redux, the provider makes the redux store available to the react components
//so the base app component has to be wrapped in the provider component, which is included in react-redux
import { Provider } from 'react-redux';

import store from './store'
import { addAllEmployees, addAllDepartments } from './store'

import Departments from './Departments';
import Stats from './Stats';

//all the this.setStates should be removed from the component

class App extends React.Component{
  constructor(){
    super();
    this.state = store.getState()
    //might be able to remove these
    this.destroyEmployee = this.destroyEmployee.bind(this);
    this.removeFromDepartment = this.removeFromDepartment.bind(this);
  }

  //should be able to delete this
  async destroyEmployee(employee){
    await axios.delete(`/api/employees/${employee.id}`);
    const employees = this.state.employees.filter(_employee => employee.id !== _employee.id);
    this.setState({ employees });
  }

  //should be able to delete this
  async removeFromDepartment(employee){
    employee = (await axios.put(`/api/employees/${employee.id}`, { departmentId: null})).data;
    //const employees = this.state.employees.map(_employee => employee.id === _employee.id ? employee : _employee);
    //this.setState({ employees });
  }

  async componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    const [ employees, departments ] = await Promise.all([
      axios.get('/api/employees'),
      axios.get('/api/departments'),
    ]);
    store.dispatch(addAllEmployees(employees.data))
    store.dispatch(addAllDepartments(departments.data))
  }

  componentDidUnMount(){
    this.unsubscribe()
  }


  render(){
    const { departments, employees } = this.state;
    const { destroyEmployee, removeFromDepartment } = this;
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats employees={ employees }/>
        <Departments
          departments={ departments }
          employees={ employees }
          destroyEmployee = { destroyEmployee }
          removeFromDepartment = { removeFromDepartment }
      />
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.querySelector('#root'));
