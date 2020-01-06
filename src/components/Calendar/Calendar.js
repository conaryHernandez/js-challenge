import React, { Component } from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

import classes from './Calendar.module.scss';

class CalendarWrapper extends Component {
  getListData = value => {
    let listData;

    listData = this.props.reminders
      .filter(element => {
        const newElement = {};
        if (moment(element.date).isSame(value, 'day')) {
          newElement.title = element.title;
          newElement.color = element.color;

          return newElement;
        }

        return null;
      })
      .sort((a, b) => moment(a.time).unix() - moment(b.time).unix());

    return listData || [];
  };

  dateCellRender = value => {
    const listData = this.getListData(value);

    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={`${item.title}-${index}`}>
            <div
              className={classes.Reminder}
              style={{ backgroundColor: item.color }}>
              <b className={classes.ReminderTitle}>{item.title}</b>

              <span className={classes.Time}>
                {moment(item.time).format('HH:mm')}
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <Calendar
        dateCellRender={this.dateCellRender}
        onSelect={date => this.props.onSelectDate(date)}
      />
    );
  }
}

CalendarWrapper.propTypes = {
  reminders: PropTypes.array.isRequired,
  onSelectDate: PropTypes.func
};

CalendarWrapper.defaultProps = {
  reminders: [],
  onSelectDate: () => {}
};

export default CalendarWrapper;
