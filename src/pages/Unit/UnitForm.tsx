import services from '@/services';
import { Button, Form, Input } from 'antd';
import React from 'react';
import type { UnitType } from './index';
const { updateInfo } = services.UnitController;

type IProp = {
  initialValue: UnitType;
  closeModal: () => void;
};

const UnitForm: React.FC<IProp> = (props: IProp) => {
  const onFinish = (values: any) => {
    updateInfo(values).then((res) => {
      if (res.state === 200) {
        props.closeModal();
      }
    });
  };

  return (
    <Form
      name="unitInfo"
      onFinish={onFinish}
      initialValues={props.initialValue || {}}
    >
      <Form.Item name="id" />
      <Form.Item
        name="fullName"
        rules={[{ required: true, message: '请输入单位名称' }]}
      >
        <Input placeholder="单位名称" />
      </Form.Item>
      <Form.Item
        name="contactPerson"
        rules={[{ required: true, message: '请输入联系人名称' }]}
      >
        <Input placeholder="联系人名称" />
      </Form.Item>
      <Form.Item
        name="contactPhone"
        rules={[{ required: true, message: '请输入联系人电话' }]}
      >
        <Input placeholder="联系人电话" />
      </Form.Item>
      <Form.Item
        name="contactEmail"
        rules={[{ required: true, message: '请输入联系人邮箱' }]}
      >
        <Input placeholder="联系人邮箱" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UnitForm;
