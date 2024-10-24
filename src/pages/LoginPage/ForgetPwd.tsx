import { Button, Form, Input, Space } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import React from 'react';
import styles from './index.less';

type IProp = {
  setFormType: (type: string) => void;
  messageApi: MessageInstance;
};

const ForgetPasswordForm: React.FC<IProp> = (props: IProp) => {
  console.log(props);
  return (
    <div className={styles.forgetPasswordForm}>
      <Form name="login">
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: '请输入手机号码' }]}
        >
          <Input placeholder="手机号码" />
        </Form.Item>
        <Form.Item
          name="smsCode"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="验证码" />
            <Button type="primary">获取验证码</Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
