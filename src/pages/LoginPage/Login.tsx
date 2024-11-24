import services from '@/services';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Form, Input } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import styles from './index.less';

const { login } = services.UserController;

type IProp = {
  setFormType: (type: string) => void;
  messageApi: MessageInstance;
};

const Login: React.FC<IProp> = (props: IProp) => {
  const onFinish = (values: any) => {
    login(values).then((res) => {
      // 登录成功
      if (res) {
        props.messageApi.open({
          type: 'success',
          content: res,
        });
        history.push('/');
        sessionStorage.setItem('token', res?.token);
        sessionStorage.setItem('userId', res?.userId);
      } else {
        props.messageApi.open({
          type: 'error',
          content: res.message,
        });
      }
      // 登录失败
    });
  };

  return (
    <div className={styles.loginForm}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: '请输入手机号码' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="手机号码" />
        </Form.Item>
        <Form.Item
          name="pwd"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="登录密码"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
          <div className={styles.registerAndForget}>
            <a onClick={() => props.setFormType('forgetPwd')}>忘记密码</a>
            <a onClick={() => props.setFormType('register')}>现在注册</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
