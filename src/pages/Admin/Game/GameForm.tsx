import services from '@/services';
import { Button, DatePicker, Form, Input, message } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

const { createGame, updateGameInfo } = services.GameController;

const { RangePicker } = DatePicker;
const { Item } = Form;

interface IProps {
  initialValue: any;
  successCallback: () => void;
}

const GameForm: React.FC<IProps> = (props: IProps) => {
  const onFinish = (values: any) => {
    const enrollStartTime = values.enrollTime[0].format('YYYY-MM-DD');
    const enrollEndTime = values.enrollTime[1].format('YYYY-MM-DD');
    const startTime = values.gameTime[0].format('YYYY-MM-DD');
    const endTime = values.gameTime[1].format('YYYY-MM-DD');
    const requestBody = {
      id: values.id,
      name: values.name,
      contactPhone: values.contactPhone,
      contactEmail: values.contactEmail,
      enrollStartTime: enrollStartTime,
      enrollEndTime: enrollEndTime,
      startTime: startTime,
      endTime: endTime,
      matchAddress: values.matchAddress,
    };
    if (!values.id) {
      // 新建
      createGame(requestBody).then((res) => {
        if (res.data) {
          props.successCallback();
        } else {
          message.error({
            content: res.message,
          });
        }
      });
    } else {
      updateGameInfo(requestBody).then((res) => {
        if (res.data) {
          props.successCallback();
        } else {
          message.error({
            content: res.message,
          });
        }
      });
    }
  };

  const initilaFormData = useMemo(() => {
    if (!props.initialValue) {
      return {};
    }
    return {
      ...props.initialValue,
      enrollTime: [
        dayjs(props.initialValue.enrollStartTime),
        dayjs(props.initialValue.enrollEndTime),
      ],
      gameTime: [
        dayjs(props.initialValue.startTime),
        dayjs(props.initialValue.endTime),
      ],
    };
  }, [props.initialValue]);

  return (
    <Form name="login" onFinish={onFinish} initialValues={initilaFormData}>
      <Item name="id" style={{ display: 'none' }}></Item>
      <Item name="name" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input placeholder="赛事名称" />
      </Item>
      <Item
        name="matchAddress"
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Input placeholder="赛事地点" />
      </Item>
      <Item name="contactPhone" rules={[{ required: true, message: '' }]}>
        <Input placeholder="联系电话" />
      </Item>
      <Item name="contactEmail" rules={[{ required: true, message: '' }]}>
        <Input placeholder="联系邮箱" />
      </Item>
      <Item
        name="enrollTime"
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <RangePicker
          placeholder={['报名开始时间', '报名结束时间']}
          format={'YYYY-MM-DD'}
        />
      </Item>
      <Item name="gameTime" rules={[{ required: true, message: '请输入姓名' }]}>
        <RangePicker
          placeholder={['比赛开始时间', '比赛结束时间']}
          format={'YYYY-MM-DD'}
        />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Item>
    </Form>
  );
};

export default GameForm;
