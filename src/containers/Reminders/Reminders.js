import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ReminderList from '../../components/Reminders/ReminderList/ReminderList';
import ReminderModal from '../../components/Reminders/ReminderModal/ReminderModal';
import * as actions from '../../store/actions';

class Reminders extends Component {
  state = {
    date: '',
    dateReminders: [],
    visible: false,
    confirmLoading: false,
    selectedElement: {}
  };

  componentDidMount() {
    const { currentDate } = this.props;

    if (!currentDate) {
      this.props.history.push('/');
    }

    this.getDateReminders(currentDate);
    this.setState({ currentDate: this.props.currentDate });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reminders.length !== this.props.reminders.length) {
      console.log('update?');
      this.getDateReminders(this.props.currentDate);
    }
  }

  getDateReminders = date => {
    console.log('props no han cambiando', this.props.reminders);
    const dateReminders = this.props.reminders.filter(reminder =>
      moment(reminder.date).isSame(date, 'day')
    );

    this.setState({ dateReminders });
  };

  showReminderModal = element => {
    this.setState({ visible: true, selectedElement: element });
  };

  handleCancel = () => {
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

  editReminder = values => {
    this.props.onEditReminder(values);

    this.setState({ selectedElement: {} }, () => {
      this.getDateReminders(this.props.currentDate);
    });
  };

  deleteReminder = id => {
    this.props.onDeleteReminder(id);

    this.setState({ selectedElement: {} });
  };

  deleteAllItems = date => {
    const selectedDay = moment(date).format('MM/DD/YYYY');

    this.props.onDeleteAllReminders(selectedDay);

    this.setState({ dateReminders: [] });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Fragment>
        <h1>Your Reminders</h1>
        <ReminderList
          reminders={this.state.dateReminders}
          editAction={this.showReminderModal}
          deleteAction={this.deleteReminder}
          deleteAllAction={this.deleteAllItems}
          selectedDay={this.props.currentDate}
          goBack={this.goBack}
        />

        {this.state.visible ? (
          <ReminderModal
            mode="edit"
            visible={this.state.visible}
            confirmLoading={this.state.confirmLoading}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
            addItem={this.props.onAddReminder}
            editItem={this.editReminder}
            selectedDay={this.props.currentDate}
            getDateWeather={this.props.onSetWeather}
            getDateForecast={this.props.onSetForecast}
            defaultData={this.state.selectedElement}
          />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentDate: state.rmd.currentDate,
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
      dispatch(actions.initGetForecast(city, date, reminderId)),
    onEditReminder: data => dispatch(actions.editReminder(data)),
    onDeleteReminder: id => dispatch(actions.deleteReminder(id)),
    onDeleteAllReminders: date => dispatch(actions.deleteAllDateReminders(date))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
