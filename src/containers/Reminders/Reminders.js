import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReminderTable from '../../components/Reminders/ReminderTable/ReminderTable';

// import * as actions from '../../store/actions';

class ReminderForm extends Component {
  state = {
    date: '',
    reminders: []
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

  render() {
    return (
      <Fragment>
        <h1>Reminder Page </h1>
        <ReminderTable reminders={this.state.reminders} />
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

/* const mapDispatchToProps = dispatch => {
  return {};
};

*/

export default connect(mapStateToProps, null)(ReminderForm);
