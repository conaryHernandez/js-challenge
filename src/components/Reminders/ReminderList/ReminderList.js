import React, { Fragment } from 'react';
import { Button, Result } from 'antd';
import PropTypes from 'prop-types';
import ReminderCard from '../ReminderCard/ReminderCard';

import classes from './ReminderList.module.scss';

const ReminderList = props => {
  const buildReminders = () => {
    if (props.reminders.length === 0) {
      return <Result title="No reminders for this date :(" />;
    }

    return props.reminders.map(rmd => {
      return (
        <ReminderCard
          key={rmd.id}
          reminder={rmd}
          editAction={props.editAction}
          deleteAction={props.deleteAction}
        />
      );
    });
  };

  return (
    <Fragment>
      {buildReminders()}
      <Button
        type="primary"
        icon="left"
        className={classes['delete-button']}
        onClick={props.goBack}>
        Go Back
      </Button>

      {props.reminders.length > 0 && (
        <Button
          type="danger"
          icon="warning"
          className={classes['delete-button']}
          onClick={() => props.deleteAllAction(props.selectedDay)}>
          Delete All
        </Button>
      )}
    </Fragment>
  );
};

ReminderList.propTypes = {
  reminders: PropTypes.array.isRequired,
  editAction: PropTypes.func,
  deleteAction: PropTypes.func,
  deleteAllAction: PropTypes.func,
  selectedDay: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  goBack: PropTypes.func
};

ReminderList.defaultProps = {
  reminders: [],
  editAction: () => {},
  deleteAction: () => {},
  deleteAllAction: () => {},
  selectedDay: '',
  goBack: () => {}
};

export default ReminderList;
