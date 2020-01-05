import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReminderTable from '../../components/Reminders/ReminderTable/ReminderTable';
import ReminderModal from '../../components/Reminders/ReminderModal/ReminderModal';
import moment from 'moment';
import * as actions from '../../store/actions';

class Reminders extends Component {
  state = {
    date: '',
    reminders: [],
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

  getDateReminders = date => {
    const dateReminders = this.props.reminders.filter(reminder =>
      moment(reminder.date).isSame(date, 'day')
    );

    this.setState({ reminders: dateReminders });
  };

  getSelectedReminder = () => {};

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

  deleteReminder = id => {
    this.props.onDeleteReminder(id);

    this.setState({ selectedElement: {} });
  };

  render() {
    return (
      <Fragment>
        <h1>Your Reminders</h1>
        <ReminderTable
          reminders={this.state.reminders}
          editAction={this.showReminderModal}
          deleteAction={this.deleteReminder}
        />

        {this.state.visible ? (
          <ReminderModal
            mode="edit"
            visible={this.state.visible}
            confirmLoading={this.state.confirmLoading}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
            addItem={this.props.onAddReminder}
            editItem={this.props.onEditReminder}
            selectedDay={this.props.currentDate}
            getDateWeather={this.props.onSetWeather}
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
    onSetWeather: city => dispatch(actions.initGetWeather(city)),
    onEditReminder: data => dispatch(actions.editReminder(data)),
    onDeleteReminder: id => dispatch(actions.deleteReminder(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
