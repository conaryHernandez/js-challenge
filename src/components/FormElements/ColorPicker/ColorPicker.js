import React from 'react';
import { useField } from 'formik';
// import { Input } from 'antd';
import { GithubPicker } from 'react-color';

import classes from '../index.module.scss';
import { Input } from 'antd';

const ColorPicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputClasses = [meta.error && meta.touched ? classes.Invalid : ''];
  const errorLabelClasses = [
    meta.error && meta.touched ? classes.InvalidText : ''
  ];

  const onChange = value => {
    const fakeEvent = {
      currentTarget: {
        value: value.hex,
        type: 'text',
        name: props.name
      }
    };

    props.onChange(fakeEvent);
  };

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <GithubPicker
        {...field}
        {...props}
        onChange={onChange}
        className={inputClasses.join(' ')}
      />

      <Input id={props.id} type="hidden" value={props.value} />

      {meta.touched && meta.error ? (
        <div
          data-testid={`${props.id}Error`}
          className={errorLabelClasses.join(' ')}
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
