import services from '@/services';
import { PageContainer } from '@ant-design/pro-components';
import { connect, history } from '@umijs/max';
import { Button, Modal, Table } from 'antd';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import GameForm from './GameForm';

const { getGameList } = services.GameController;

const Game: React.FC<any> = (props) => {
  const [gameList, setGameList] = useState([]);
  const [gameData, setGameData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const tableRef: MutableRefObject<any> = useRef();

  const gameColumns = [
    {
      title: '赛事ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '赛事名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '联系电话',
      key: 'contactPhone',
      dataIndex: 'contactPhone',
    },
    {
      title: '联系邮箱',
      key: 'contactEmail',
      dataIndex: 'contactEmail',
    },
    {
      title: '报名时间',
      key: 'enrollTime',
      render: (_text: string, record: any) => {
        const enrollStartTimeText = record.enrollStartTime.substr(0, 10);
        const enrollEndTimeText = record.enrollEndTime.substr(0, 10);
        return `${enrollStartTimeText}至${enrollEndTimeText}`;
      },
    },
    {
      title: '比赛时间',
      key: 'gameTime',
      render: (_text: string, record: any) => {
        const startTimeText = record.startTime.substr(0, 10);
        const endTimeText = record.endTime.substr(0, 10);
        return `${startTimeText}至${endTimeText}`;
      },
    },
    {
      title: '比赛地址',
      key: 'matchAddress',
      dataIndex: 'matchAddress',
    },
    {
      title: '操作',
      render: (_text: string, record: any) => {
        return (
          <>
            <Button
              onClick={() => {
                props.dispatch({ type: 'game/setGameInfo', payload: record });
                history.push('/game/item');
              }}
            >
              进入
            </Button>
            <Button
              onClick={() => {
                setGameData(record);
                setModalVisible(true);
              }}
            >
              修改
            </Button>
          </>
        );
      },
    },
  ];

  const init = () => {
    getGameList().then((data: any) => {
      setGameList(data);
    });
  };

  const formSuccessCallback = () => {
    setModalVisible(false);
    setTimeout(() => {
      init();
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <PageContainer ghost>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        开设赛事
      </Button>
      <Table ref={tableRef} columns={gameColumns} dataSource={gameList}></Table>
      <Modal
        destroyOnClose
        title="赛事设置"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <GameForm
          initialValue={gameData}
          successCallback={formSuccessCallback}
        />
      </Modal>
    </PageContainer>
  );
};

export default connect()(Game);
