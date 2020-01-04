import React from 'react';
import { useField } from 'formik';
import { Input } from 'antd';

import classes from '../index.module.scss';

const Textarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputClasses = [meta.error && meta.touched ? classes.Invalid : ''];
  const errorLabelClasses = [
    meta.error && meta.touched ? classes.InvalidText : ''
  ];

  const { TextArea } = Input;

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <TextArea
        className={inputClasses.join(' ')}
        rows={4}
        onChange={props.onChange}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={errorLabelClasses.join(' ')}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Textarea;
