import React, { Component, Fragment } from 'react';
import { Button } from 'antd';

import Calendar from '../../components/Calendar/Calendar';
import ReminderModal from './ReminderModal/ReminderModal';

class Home extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    selectedDay: new Date()
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

  handleSelectedDay = date => this.setState({ selectedDay: date });

  render() {
    return (
      <Fragment>
        <h1>My Calendar</h1>
        <Button
          type="primary"
          onClick={this.showModal}
          shape="round"
          icon="plus"
          size="large"
        >
          Add Reminder
        </Button>

        <Calendar onChange={e => console.log(e)} />

        <ReminderModal
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          selectedDay={this.state.selectedDay}
        />
      </Fragment>
    );
  }
}

export default Home;
