import React from 'react';
import { useField } from 'formik';

import classes from '../index.module.scss';

const Select = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  const errorLabelClasses = [meta.error && meta.touched ? classes.Invalid : ''];

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <select onChange={props.onChange} {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className={errorLabelClasses.join(' ')}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Select;
