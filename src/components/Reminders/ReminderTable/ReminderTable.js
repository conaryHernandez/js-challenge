import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    render: time => moment(time).format('HH:mm')
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city'
  },
  {
    title: 'Color',
    key: 'color',
    dataIndex: 'color'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span key={text}>
        <a href="/">Delete</a>
      </span>
    )
  }
];

const ReminderTable = props => {
  console.log(props);
  return (
    <Table
      rowKey={record => record.uid}
      columns={columns}
      dataSource={props.reminders}
      pagination={false}
    />
  );
};

export default ReminderTable;
