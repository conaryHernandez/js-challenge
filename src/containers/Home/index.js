import React, { Component, Fragment } from 'react';
import Calendar from '../../components/Calendar/Calendar';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <h1>Home Page</h1>
        <Calendar />
      </Fragment>
    );
  }
}

export default Home;
