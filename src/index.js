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
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats />
        <Departments/>
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.querySelector('#root'));
