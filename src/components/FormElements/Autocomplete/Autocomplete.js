import React from 'react';
import { useField } from 'formik';
import { AutoComplete, Icon, Input } from 'antd';

import cities from '../../../assets/cities.json';
import classes from '../index.module.scss';

const { Option } = AutoComplete;

function renderOption(item) {
  return (
    <Option key={item.city} value={`${item.city}-${item.state}`}>
      <div className="global-search-item">
        {item.city}
        <span className="certain-search-item-count">, {item.state}</span>
      </div>
    </Option>
  );
}

const CustomAutocomplete = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputClasses = [
    'certain-category-search',
    meta.error && meta.touched ? classes.Invalid : ''
  ];
  const errorLabelClasses = [
    meta.error && meta.touched ? classes.InvalidText : ''
  ];

  function onChange(value) {
    const fakeEvent = {
      currentTarget: {
        value: value,
        type: 'text',
        name: props.name
      }
    };

    props.onChange(fakeEvent);
  }

  return (
    <div className="certain-category-search-wrapper" style={{ width: 250 }}>
      <label htmlFor={props.id || props.name}>{label}</label>

      <AutoComplete
        className={inputClasses.join(' ')}
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 300 }}
        size="large"
        style={{ width: '100%' }}
        dataSource={cities.map(renderOption)}
        placeholder="Enter a city"
        optionLabelProp="value"
        {...props}
        {...field}
        onChange={onChange}
        value={props.value}
      >
        <Input
          suffix={<Icon type="search" className="certain-category-icon" />}
        />
      </AutoComplete>

      {meta.touched && meta.error ? (
        <div className={errorLabelClasses.join(' ')}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomAutocomplete;
