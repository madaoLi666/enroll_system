import { PageContainer } from '@ant-design/pro-components';
import { connect, history } from '@umijs/max';
import { Button, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ItemForm from './ItemForm';

type IProp = {
  game: any;
  dispatch: (params: { type: string; payload: any }) => void;
};

const Item: React.FC<IProp> = (props: IProp) => {
  const { game } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [itemData, setItemData] = useState({});

  if (!game.gameInfo.id) {
    history.push('/game/game');
  }

  const itemColumns = [
    {
      title: '项目ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '项目名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '是否为团体项目',
      key: 'isTeam',
      dataIndex: 'isTeam',
      render: (text: boolean) => {
        return text ? '是' : '否';
      },
    },
    {
      title: '队员人数限制',
      key: 'number',
      render: (_text: string, record: any) => {
        return `${record.minNumber} - ${record.maxNumber}`;
      },
    },
    {
      title: '报名数量限制',
      key: 'limitedNumber',
      dataIndex: 'limitedNumber',
    },
    {
      title: '年龄限制',
      key: 'age',
      render: (_text: string, record: any) => {
        console.log(_text);
        const startTimeText = record.minAge.substr(0, 10);
        const endTimeText = record.maxAge.substr(0, 10);
        return `${startTimeText}至${endTimeText}`;
      },
    },
    {
      title: '操作',
      render: (_text: string, record: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setModalVisible(true);
                setItemData(record);
              }}
            >
              修改
            </Button>
          </>
        );
      },
    },
  ];

  const getItems = () => {
    props.dispatch({
      type: 'game/queryItem',
      payload: {
        gameId: game.gameInfo.id,
      },
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <PageContainer ghost>
      <div>
        <h1>{game?.gameInfo?.name}</h1>
      </div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        开项目
      </Button>
      <Table columns={itemColumns} dataSource={props.game.items} />

      <Modal
        destroyOnClose
        title="项目设置"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <ItemForm
          initialValue={itemData}
          successCallback={() => {
            getItems();
            setModalVisible(false);
          }}
        />
      </Modal>
    </PageContainer>
  );
};

export default connect(({ game }) => {
  return { game };
})(Item);
