import React, { Component, Fragment } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import AddReminder from './ReminderModal/ReminderModal';

class Home extends Component {
  state = {
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  render() {
    return (
      <Fragment>
        <h1>Home Page</h1>
        <Calendar onClickDay={this.showModal} />

        <AddReminder
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
        />
      </Fragment>
    );
  }
}

export default Home;
