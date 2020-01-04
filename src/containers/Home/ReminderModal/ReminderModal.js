import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import { Formik } from 'formik';
import moment from 'moment';

import {
  Textarea,
  Input,
  TimePicker,
  DatePicker,
  Autocomplete
} from '../../../components/FormElements';

// values => validate(values, this.state.rules)

class ReminderModal extends Component {
  render() {
    const { confirmLoading, visible, handleOk, handleCancel } = this.props;

    return (
      <Formik
        initialValues={{
          title: '',
          description: '',
          time: moment(),
          date: moment(),
          city: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);

          handleOk();
        }}
        validateOnChange
        validate={() => {}}
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
                />
                <Textarea
                  label="Description"
                  name="description"
                  placeholder="Enter a description"
                  onChange={handleChange}
                  value={values.description}
                  id="description"
                />
                <TimePicker
                  onChange={handleChange}
                  label="Time"
                  name="time"
                  value={values.time}
                  id="time"
                />

                <DatePicker
                  onChange={handleChange}
                  value={values.date}
                  name="date"
                  id="date"
                  label="Select a Date"
                />

                <Autocomplete
                  name="city"
                  id="city"
                  label="Select a city"
                  value={values.city}
                  onChange={handleChange}
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
