import React, { Component } from 'react';
import Calendar from 'react-calendar';

import classes from './Calendar.module.scss';
// import ChevronRight from "@material-ui/icons/ChevronRight";
// import ChevronLeft from "@material-ui/icons/ChevronLeft";

class CalendarWrapper extends Component {
  state = {
    date: new Date()
  };

  handleChange = date => this.setState({ date });

  render() {
    const startDate = new Date(2019, 3, 2);

    return (
      <div>
        <Calendar
          // nextLabel={<ChevronRight />}
          // prevLabel={<ChevronLeft />}
          next2Label={false}
          prev2Label={false}
          calendarType={'US'}
          className={classes.calendar}
          onChange={this.handleChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default CalendarWrapper;
