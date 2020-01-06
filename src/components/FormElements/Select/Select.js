import React from 'react';
import { useField } from 'formik';
import Select from 'react-dropdown-select';
import { List } from 'react-virtualized';
import PropTypes from 'prop-types';

import classes from '../index.module.scss';
import './Select.module.scss';

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
          onClick={() => methods.addItem(options[index])}>
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
    const fakeEvent = {
      currentTarget: {
        value: values[0].name ? values[0].name : props.defaultValue,
        type: 'text',
        name: props.name
      }
    };

    props.onChange(fakeEvent);
  };

  const [field, meta] = useField(props);

  const inputClasses = [
    classes.Select,
    meta.error && meta.touched ? classes.Invalid : ''
  ];

  const errorLabelClasses = [
    meta.error && meta.touched ? classes.InvalidText : ''
  ];

  return (
    <div>
      <label
        className={classes['control-label']}
        htmlFor={props.id || props.name}>
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
        values={props.values.length > 0 ? [{ name: props.values }] : []}
        value={props.value.length > 0 ? props.value : []}
      />

      {meta.touched && meta.error ? (
        <div
          data-testid={`${props.id}Error`}
          className={errorLabelClasses.join(' ')}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

VSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

VSelect.defaultProps = {
  id: '',
  name: '',
  label: 'Enter a Value',
  onChange: () => {}
};

export default VSelect;
