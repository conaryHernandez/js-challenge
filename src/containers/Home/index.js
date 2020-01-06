import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from 'antd';

import Calendar from '../../components/Calendar/Calendar';
import ReminderModal from '../../components/Reminders/ReminderModal/ReminderModal';
import * as actions from '../../store/actions';
import { validaNewReminderDate } from '../../utils/dates';

const { Title } = Typography;

class Home extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    selectedDay: new Date()
  };

  componentDidUpdate(prevProps) {
    if (prevProps.reminders.length !== this.props.reminders.length) {
      return this.props.reminders;
    }
  }

  showModal = () => {
    this.setState({
      visible: true
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

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  redirectToRemindersPage = date => {
    this.props.history.push('/reminders');

    this.props.onAddCurrentDate(date);
  };

  handleSelectedDay = date => this.setState({ selectedDay: date });

  render() {
    return (
      <Fragment>
        <Title className="MainTitle">My Calendar</Title>
        <Button
          type="primary"
          onClick={this.showModal}
          shape="round"
          icon="plus"
          size="large">
          Add Reminder
        </Button>

        <Calendar
          onSelectDate={this.redirectToRemindersPage}
          reminders={this.props.reminders}
        />

        <ReminderModal
          reminders={this.props.reminders}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          addItem={this.props.onAddReminder}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          selectedDay={this.state.selectedDay}
          getDateWeather={this.props.onSetWeather}
          getDateForecast={this.props.onSetForecast}
          validateNewItem={validaNewReminderDate}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    reminders: state.rmd.reminders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddReminder: data => dispatch(actions.addReminder(data)),
    onAddCurrentDate: date => dispatch(actions.addCurrentDate(date)),
    onSetWeather: (city, reminderId) =>
      dispatch(actions.initGetWeather(city, reminderId)),
    onSetForecast: (city, date, reminderId) =>
      dispatch(actions.initGetForecast(city, date, reminderId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
