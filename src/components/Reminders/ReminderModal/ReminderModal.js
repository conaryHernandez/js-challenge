import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import { Formik } from 'formik';
import moment from 'moment';

import { validate } from '../../../utils/validator';

import {
  Input,
  TimePicker,
  DatePicker,
  ColorPicker,
  Select
} from '../../../components/FormElements';

import cities from '../../../assets/cities.json';

class ReminderModal extends Component {
  state = {
    rules: {
      title: {
        isRequired: true
      },
      color: {
        isRequired: true
      },
      time: {
        isRequired: true
      },
      date: {
        isRequired: true
      },
      city: {
        isRequired: true
      }
    }
  };

  onSubmit = (values, setSubmitting) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);

    this.props.handleOk();

    if (this.props.mode === 'edit') {
      this.props.editItem(values);
    } else {
      this.props.addItem(values);
    }

    this.props.getDateWeather(values.city, values.id);
  };

  // creating dummy ids because there is no BE.
  generateDummyId = () => {
    console.log('called???');

    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  render() {
    const { confirmLoading, visible, handleCancel, defaultData } = this.props;
    let initialValues = {};

    if (defaultData) {
      initialValues.id = defaultData.id;
      initialValues.title = defaultData.title;
      initialValues.time = defaultData.time;
      initialValues.date = defaultData.date;
      initialValues.city = defaultData.city;
      initialValues.color = defaultData.color;
    } else {
      console.log('no intial data');
    }

    return (
      <Formik
        initialValues={{
          id: initialValues.id || this.generateDummyId(),
          title: initialValues.title || '',
          time: initialValues.time || moment(),
          date: initialValues.date || moment(),
          city: initialValues.city || '',
          color: initialValues.color || ''
        }}
        onSubmit={(values, { setSubmitting }) =>
          this.onSubmit(values, setSubmitting)
        }
        validateOnChange
        validate={values => validate(values, this.state.rules)}
      >
        {props => {
          const {
            values,
            handleReset,
            handleChange,
            handleSubmit,
            resetForm
          } = props;

          console.log('values.id', values.id, values.city);

          return (
            <Modal
              title="Add New Reminder"
              visible={visible}
              onOk={handleSubmit}
              afterClose={handleReset}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form>
                <Input
                  label="Title"
                  name="title"
                  type="title"
                  placeholder="Enter a title"
                  onChange={handleChange}
                  value={values.title}
                  id="title"
                  maxLength={30}
                />

                <ColorPicker
                  name="color"
                  label="Select a color"
                  onChange={handleChange}
                  value={values.color}
                  id="color"
                />

                <TimePicker
                  label="Time"
                  name="time"
                  onChange={handleChange}
                  value={values.time}
                  id="time"
                />

                <DatePicker
                  name="date"
                  id="date"
                  onChange={handleChange}
                  value={values.date}
                  label="Select a Date"
                />

                <Select
                  name="city"
                  id="city"
                  onChange={handleChange}
                  value={values.city}
                  label="Select a city"
                  initialData={cities}
                  defaultValue={values.city ? [{ name: values.city }] : []}
                />
              </Form>
            </Modal>
          );
        }}
      </Formik>
    );
  }
}

export default ReminderModal;
