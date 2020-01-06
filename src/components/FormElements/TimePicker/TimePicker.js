import React from 'react';
import { useField } from 'formik';
import { TimePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

import classes from '../index.module.scss';

const CustomTimePicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputClasses = [meta.error && meta.touched ? classes.Invalid : ''];
  const errorLabelClasses = [
    meta.error && meta.touched ? classes.InvalidText : ''
  ];
  const format = 'HH:mm';

  const onChange = (time, timeString) => {
    const fakeEvent = {
      currentTarget: {
        value: time ? time.format() : moment(),
        type: 'text',
        name: props.name
      }
    };

    props.onChange(fakeEvent);
  };

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className={classes['control-label']}>
        {label}
      </label>

      <TimePicker
        defaultValue={moment('12:08', format)}
        format={format}
        className={inputClasses.join(' ')}
        {...props}
        {...field}
        value={moment(props.value)}
        onChange={onChange}
        suffixIcon={<span />}
      />

      {meta.touched && meta.error ? (
        <div className={errorLabelClasses.join(' ')}>{meta.error}</div>
      ) : null}
    </div>
  );
};

CustomTimePicker.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

CustomTimePicker.defaultProps = {
  id: '',
  name: '',
  label: 'Enter a Value',
  onChange: () => {}
};

export default CustomTimePicker;
