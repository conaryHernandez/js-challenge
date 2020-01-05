import React, { Fragment } from 'react';
import { Icon, Tag, Typography, Button, Card, Row, Col } from 'antd';
import moment from 'moment';

import classes from './ReminderList.module.scss';

const { Text } = Typography;

const ReminderTable = props => {
  const buildForecast = rmd => {
    const { dateForecast = [] } = rmd;

    return dateForecast.map(item => {
      return (
        <Col key={item.dt} className="ant-col-xs-12 ant-col-sm-8 ant-col-md-6">
          <span className={classes.Time}>
            <Icon type="clock-circle" />
            {moment(item.dt_txt).format('HH:mm')}
          </span>
          <span className={classes.Weather}>{item.weather[0].main}</span>
          <span className={classes.Temp}>
            {item.main.temp}
            <sup>°</sup>C
          </span>
          <img
            alt={item.weather[0].main}
            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
          />
        </Col>
      );
    });
  };

  const buildReminders = () => {
    return props.reminders.map(rmd => {
      return (
        <Card
          key={rmd.id}
          title={rmd.title}
          bordered
          bodyStyle={{ backgroundColor: rmd.color }}
        >
          <p>
            <Icon type="hourglass" />
            <Text ellipsis underline className={classes.Text}>
              {moment(rmd.time).format('HH:mm')}
            </Text>
          </p>
          <p>
            <Icon type="team" />
            <Text ellipsis underline className={classes.Text}>
              {rmd.city}
            </Text>
          </p>

          <div>
            <Row>{buildForecast(rmd)}</Row>
          </div>

          <div className={classes.Actions}>
            <Button icon="edit" onClick={() => props.editAction(rmd)}>
              Edit
            </Button>
            <Button
              icon="delete"
              type="danger"
              onClick={() => props.deleteAction(rmd.id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      );
    });
  };

  return (
    <Fragment>
      {buildReminders()}

      {props.reminders.length > 0 && (
        <Button
          type="danger"
          icon="warning"
          className={classes['delete-button']}
          onClick={() => props.deleteAllAction(props.selectedDay)}
        >
          Delete All
        </Button>
      )}
    </Fragment>
  );
};

export default ReminderTable;
