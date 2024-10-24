import services from '@/services';
import RegexRules from '@/utils/pattern';
import { Button, Form, Input, Select, Space } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import React from 'react';
import styles from './index.less';

type IProp = {
  setFormType: (type: string) => void;
  messageApi: MessageInstance;
};

const { register } = services.UserController;

const RegisterForm: React.FC<IProp> = (props: IProp) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    register(values).then((res) => {
      if (res.state === 200) {
        props.setFormType('login');
        props.messageApi.open({
          type: 'success',
          content: res.message,
        });
      } else {
        props.messageApi.open({
          type: 'error',
          content: res.message,
        });
      }
    });
  };

  const sendSmsCode = () => {
    const phoneNumber = form.getFieldValue('phoneNumber');
    console.log(phoneNumber);
  };

  return (
    <div className={styles.forgetPasswordForm}>
      <Form name="login" form={form} onFinish={onFinish}>
        <Form.Item
          name="userName"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="sex"
          rules={[{ required: true, message: '请选择你的性别' }]}
        >
          <Select
            placeholder="性别"
            options={[
              { value: 1, label: '男' },
              { value: 0, label: '女' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入你的电子邮箱' }]}
        >
          <Input placeholder="电子邮箱" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: '请输入手机号码' },
            {
              pattern: RegexRules.phoneNumber,
              message: '请输入格式正确的手机号码',
            },
          ]}
        >
          <Input placeholder="手机号码" />
        </Form.Item>
        <Form.Item
          name="smsCode"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="验证码" />
            <Button type="primary" onClick={sendSmsCode}>
              获取验证码
            </Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item
          name="pwd"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="请输入登录密码" />
        </Form.Item>
        <Form.Item
          name="confirmPwd"
          dependencies={['pwd']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入你的密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('pwd') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不相同'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="再次输入登录密码" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
