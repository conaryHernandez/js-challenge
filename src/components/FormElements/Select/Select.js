import React from 'react';
import { useField } from 'formik';
import Select from 'react-dropdown-select';
import { List } from 'react-virtualized';

import classes from '../index.module.scss';

const VSelect = ({ label, ...props }) => {
  const renderOptions = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, 'i');
    const options = props.options.filter(item =>
      regexp.test(item[props.searchBy] || item.label)
    );

    const rowRenderer = ({ index, style }) => {
      return (
        <div
          key={options[index].id}
          className="dropdown-element"
          style={style}
          onClick={() => methods.addItem(options[index])}
        >
          {options[index].name}
        </div>
      );
    };

    return (
      <List
        width={299}
        height={280}
        rowCount={options.length}
        rowHeight={35}
        rowRenderer={rowRenderer}
      />
    );
  };

  const onChange = values => {
    console.log('value on hcange', values.name);
    const fakeEvent = {
      currentTarget: {
        value: values[0].name,
        type: 'text',
        name: props.name
      }
    };

    props.onChange(fakeEvent);
  };

  const [field, meta] = useField(props);

  const inputClasses = [meta.error && meta.touched ? classes.Invalid : ''];

  const errorLabelClasses = [
    meta.error && meta.touched ? classes.InvalidText : ''
  ];

  return (
    <div>
      <label
        className={classes['control-label']}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <Select
        options={props.initialData}
        searchBy="name"
        searchable="true"
        sortBy="name"
        placeholder="Select a city"
        labelField="name"
        dropdownHandle={false}
        dropdownRenderer={renderOptions}
        className={inputClasses.join(' ')}
        {...field}
        {...props}
        onChange={onChange}
        values={props.value}
      />

      {meta.touched && meta.error ? (
        <div className={errorLabelClasses.join(' ')}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default VSelect;
