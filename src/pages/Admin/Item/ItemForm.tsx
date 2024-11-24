import { connect } from '@umijs/max';
import { Button, DatePicker, Form, Input, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';

const { Item } = Form;
const { RangePicker } = DatePicker;

interface IProp {
  initialValue: any;
  successCallback: () => void;
  dispatch: (arg: { [key: string]: any }) => Promise<any>;
  [key: string]: any;
}

const ItemForm: React.FC<any> = (props: IProp) => {
  const { game } = props;
  const [isTeam, setIsTeam] = useState(false);
  const [eventId, setEventId] = useState(0);
  const onFinish = (values: any) => {
    const maxAge = values['age'][0].format('YYYY-MM-DD');
    const minAge = values['age'][1].format('YYYY-MM-DD');
    const requestBody = {
      id: values['id'],
      eventId: eventId,
      name: values['name'],
      gameId: game.gameInfo.id, // 拿dva里面的
      isTeam: isTeam,
      minNumber: values['minNum'],
      maxNumber: values['maxNum'],
      minAge,
      maxAge,
      remark: values['remark'],
    };

    props
      .dispatch({
        type: 'game/item',
        payload: requestBody,
      })
      .then((res: any) => {
        if (res) {
          props.successCallback();
        }
      });
  };

  const initilaFormData = useMemo(() => {
    const { initialValue } = props;
    setEventId(initialValue.eventId);
    return {
      id: initialValue.id,
      name: initialValue.name,
      isTeam: initialValue.isTeam,
      minNum: initialValue.minNumber,
      maxNum: initialValue.maxNumber,
      age: [dayjs(initialValue.minAge), dayjs(initialValue.maxAge)],
      ...initialValue,
    };
  }, []);

  return (
    <Form onFinish={onFinish} initialValues={initilaFormData}>
      <Item name="id" style={{ display: 'none' }}></Item>
      <Item name="name" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input placeholder="项目名称" />
      </Item>
      <Item
        name="eventId"
        // rules={[{ required: true, message: '请选择所属项目' }]}
      >
        {/* <Input defaultValue={1}/> */}
        <Select
          placeholder="项目类型"
          onChange={(val) => setEventId(val)}
          options={[{ value: 0, label: '自由轮滑' }]}
        />
      </Item>
      <Item name="isTeam">
        <span>是否为团体项目：</span>
        <Switch value={isTeam} onChange={(val: boolean) => setIsTeam(val)} />
      </Item>
      <Item name="minNum" rules={[{ required: true, message: '' }]}>
        <Input type="number" placeholder="最小人数" />
      </Item>
      <Item name="maxNum" rules={[{ required: true, message: '' }]}>
        <Input type="number" placeholder="最大人数" />
      </Item>
      <Item name="age" rules={[{ required: true, message: '请选择年龄段' }]}>
        <RangePicker
          placeholder={['最早出生', '最迟出生']}
          format={'YYYY-MM-DD'}
        />
      </Item>
      <Item name="remark" rules={[{ required: true, message: '请输入备注' }]}>
        <Input placeholder="备注" />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Item>
    </Form>
  );
};

export default connect(({ game }) => ({ game }))(ItemForm);
