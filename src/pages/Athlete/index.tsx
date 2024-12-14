import useToken from '@/hooks/useToken';
import services from '@/services';
import {
  ActionType,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import AthleteInfoForm from './components/AthleteInfoForm';

const { getAthleteListByUserId } = services.AthleteController;

const AthleteList: React.FC = () => {
  useToken();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [athleteInfo, setathleteInfo] = useState<API.AthleteInfo | null>(null);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.UserInfo>();

  const columns: ProDescriptionsItemProps<API.AthleteInfo>[] = [
    {
      title: '名称',
      dataIndex: 'athleteName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '证件类型',
      dataIndex: 'idCardType',
      valueType: 'text',
      valueEnum: {
        1: { text: '身份证' },
        2: { text: '港澳通行证' },
      },
    },
    {
      title: '证件号码',
      dataIndex: 'idCard',
      valueType: 'text',
    },
    {
      title: '联系方式',
      dataIndex: 'phoneNumber',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: {
        1: { text: '男' },
        0: { text: '女' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setModalVisible(true);
              setathleteInfo(record);
            }}
          >
            修改信息
          </a>
          {/* <Divider type="vertical" />
          <a href="">订阅警报</a> */}
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '运动员管理',
      }}
    >
      <ProTable<API.AthleteInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={() => setModalVisible(true)}>
            新建
          </Button>,
        ]}
        // 分页未做
        // _params, _sorter, _filter
        request={async () => {
          const userId = sessionStorage.getItem('userId') as string;
          const response = await getAthleteListByUserId({ userId });
          console.log(response);
          return {
            data: response
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />

      <Modal
        destroyOnClose
        title="添加运动员"
        width={420}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <AthleteInfoForm
          initialValue={athleteInfo}
          closeModal={() => setModalVisible(false)}
          tableRef={actionRef}
        />
      </Modal>
      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.UserInfo>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default AthleteList;
