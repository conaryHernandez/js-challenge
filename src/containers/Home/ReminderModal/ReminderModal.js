import React from 'react';
import { Modal } from 'antd';

const AddReminder = props => {
  const { confirmLoading, ModalText, visible, handleOk, handleCancel } = props;

  return (
    <div>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{ModalText}</p>
      </Modal>
    </div>
  );
};

export default AddReminder;
