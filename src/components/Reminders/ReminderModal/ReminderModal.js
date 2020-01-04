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
    this.props.addItem(values);
  };

  render() {
    const { confirmLoading, visible, handleCancel } = this.props;

    return (
      <Formik
        initialValues={{
          title: '',
          time: moment(),
          date: moment(),
          city: '',
          color: ''
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
            // touched,
            errors,
            // dirty,
            // handleReset,
            // isValidating,
            // handleBlur,
            isSubmitting,
            handleChange,
            handleSubmit
          } = props;

          return (
            <Modal
              title="Add New Reminder"
              visible={visible}
              onOk={handleSubmit}
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
