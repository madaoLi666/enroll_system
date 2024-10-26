import services from '@/services';
import { Button, Form, Input, Select } from 'antd';
import React, { MutableRefObject } from 'react';

import { ActionType } from '@ant-design/pro-components';

const { Option } = Select;

const { addAthlete, updateAthleteInfo } = services.AthleteController;

interface IProps {
  initialValue: API.AthleteInfo | null;
  closeModal: () => void;
  tableRef: MutableRefObject<ActionType | undefined>;
}

const AthleteInfoForm: React.FC<IProps> = (props) => {
  const onFinish = (values: API.AthleteInfo) => {
    if (!values.id) {
      // 新增运动员信息
      addAthlete(values).then((res: API.Result) => {
        if (res.state === 200) {
          props.closeModal();
          const { tableRef } = props;
          if (tableRef?.current) {
            tableRef.current.reload();
          }
        }
      });
    } else {
      // 修改运动员信息
      updateAthleteInfo(values).then((res) => {
        if (res.data) {
          props.closeModal();
          const { tableRef } = props;
          if (tableRef?.current) {
            tableRef.current.reload();
          }
        }
      });
    }
  };

  return (
    <Form
      name="createAthlete"
      onFinish={onFinish}
      initialValues={props.initialValue || {}}
    >
      <Form.Item name="id" style={{ display: 'none' }} />
      <Form.Item
        name="athleteName"
        rules={[{ required: true, message: '请输入运动员姓名' }]}
      >
        <Input placeholder="运动员姓名" />
      </Form.Item>
      <Form.Item
        name="idCardType"
        rules={[{ required: true, message: '请选择证件类型' }]}
      >
        <Select placeholder="证件类型">
          <Option value={1}>身份证</Option>
          <Option value={2}>港澳通行证</Option>
        </Select>
      </Form.Item>
      <Form.Item name="sex" rules={[{ required: true, message: '请选择性别' }]}>
        <Select placeholder="性别">
          <Option value={1}>男</Option>
          <Option value={0}>女</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="idCard"
        rules={[{ required: true, message: '请输入证件号码' }]}
      >
        <Input placeholder="证件号码" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: '请输入电话号码' }]}
      >
        <Input placeholder="电话号码" />
      </Form.Item>
      <Form.Item name="avatarUrl"></Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AthleteInfoForm;
