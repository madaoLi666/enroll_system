import { message } from 'antd';
import React from 'react';
import ForgetPasswordForm from './ForgetPwd';
import styles from './index.less';
import LoginForm from './Login';
import RegisterForm from './Register';

const LoginPage: React.FC = () => {
  const [formType, setFormType] = React.useState('login');

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className={styles.loginPage}>
      {contextHolder}
      <div className={styles.loginModal}>
        <div>
          <h2>报名系统</h2>
        </div>
        <div>
          {formType === 'register' ? (
            <RegisterForm setFormType={setFormType} messageApi={messageApi} />
          ) : formType === 'forgetPwd' ? (
            <ForgetPasswordForm
              setFormType={setFormType}
              messageApi={messageApi}
            />
          ) : (
            <LoginForm setFormType={setFormType} messageApi={messageApi} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
