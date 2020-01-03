import React from 'react';
import { useField } from 'formik';
import { TimePicker } from 'antd';
import moment from 'moment';

import classes from '../index.module.scss';

const CustomTimePicker = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  const errorLabelClasses = [meta.error && meta.touched ? classes.Invalid : ''];
  const format = 'HH:mm';

  function onChange(time, timeString) {
    const fakeEvent = {
      currentTarget: {
        value: moment(time).format(),
        type: 'text',
        name: props.name
      }
    };

    props.onChange(fakeEvent);
  }

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <TimePicker
        defaultValue={moment('12:08', format)}
        format={format}
        {...props}
        {...field}
        value={moment(props.value)}
        onChange={(time, timeString) => onChange(time, timeString)}
      />

      {meta.touched && meta.error ? (
        <div className={errorLabelClasses.join(' ')}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomTimePicker;
