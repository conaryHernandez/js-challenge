import React, { Fragment } from 'react';
import { Table, Tag, Divider, Button } from 'antd';
import moment from 'moment';

import classes from './ReminderTable.module.scss';

const ReminderTable = props => {
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
      dataIndex: 'color',
      render: color => <Tag className={classes['ant-tag']} color={color} />
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span key={text.id}>
          <Button onClick={() => props.editAction(record)}>Edit</Button>
          <Divider type="vertical" />

          <a href="/">Delete</a>
        </span>
      )
    }
  ];

  return (
    <Fragment>
      <Table
        rowKey={record => record.uid}
        columns={columns}
        dataSource={props.reminders}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              event.persist();
              console.log(event);
            } // click row
          };
        }}
      />
    </Fragment>
  );
};

export default ReminderTable;
