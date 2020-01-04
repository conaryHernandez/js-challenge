import React, { Component } from 'react';
import { Calendar, Badge, Tag } from 'antd';
import moment from 'moment';

import './Calendar.module.scss';

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
    let elementToRender = null;

    if (window.innerWidth >= 768) {
      elementToRender = (
        <ul className="events">
          {listData.map((item, index) => (
            <li key={`${item.title}-${index}`}>
              <Badge color={item.color} text={item.title} />{' '}
              <Tag color={item.color}>{moment(item.time).format('HH:mm')}</Tag>
            </li>
          ))}
        </ul>
      );
    } else {
      elementToRender = <Badge count={listData.length} />;
    }

    return elementToRender;
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

export default CalendarWrapper;
