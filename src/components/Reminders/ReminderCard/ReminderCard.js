import React from 'react';
import { Icon, Card, Button, Typography, Row, Col } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

import classes from './ReminderCard.module.scss';

const { Text } = Typography;

const ReminderCard = props => {
  const buildForecast = reminder => {
    const { dateForecast = [] } = reminder;

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

  return (
    <Card
      key={props.reminder.id}
      title={props.reminder.title}
      bordered
      bodyStyle={{ backgroundColor: props.reminder.color }}>
      <p>
        <Icon type="hourglass" />
        <Text ellipsis underline className={classes.Text}>
          {moment(props.reminder.time).format('HH:mm')}
        </Text>
      </p>
      <p>
        <Icon type="team" />
        <Text ellipsis underline className={classes.Text}>
          {props.reminder.city}
        </Text>
      </p>

      <div>
        <Row>{buildForecast(props.reminder)}</Row>
      </div>

      <div className={classes.Actions}>
        <Button icon="edit" onClick={() => props.editAction(props.reminder)}>
          Edit
        </Button>
        <Button
          icon="delete"
          type="danger"
          onClick={() => props.deleteAction(props.reminder.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

ReminderCard.propTypes = {
  reminders: PropTypes.object.isRequired,
  editAction: PropTypes.func,
  deleteAction: PropTypes.func
};

ReminderCard.defaultProps = {
  reminders: {
    title: '',
    time: '',
    date: '',
    city: '',
    forecast: []
  },
  editAction: () => {},
  deleteAction: () => {}
};

export default ReminderCard;
