import React from 'react';
import { useField } from 'formik';
import { Input } from 'antd';

import classes from '../index.module.scss';

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const errorLabelClasses = [meta.error && meta.touched ? classes.Invalid : ''];

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <Input onChange={props.onChange} {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className={errorLabelClasses.join(' ')}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomInput;
