import React from 'react';
import { useField } from 'formik';

import classes from '../index.module.scss';

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputClasses = [meta.error && meta.touched ? classes.Invalid : ''];

  const errorLabelClasses = [
    meta.error && meta.touched ? classes.InvalidText : ''
  ];

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <select
        className={inputClasses.join(' ')}
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

export default Select;
