import useToken from '@/hooks/useToken';
import services from '@/services';
import { Button, message, Modal } from 'antd';
import React from 'react';
import UnitForm from './UnitForm';

const { getInfo } = services.UnitController;

export type UnitType = any;

const Unit: React.FC = () => {
  useToken();

  const [unitInfo, setUnitInfo] = React.useState<UnitType>(null);

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    getInfo().then((res) => {
      if (!res.data) {
        message.open({
          type: 'warning',
          content: '请补充单位信息',
        });
      } else {
        setUnitInfo(res.data);
      }
    });
  }, [modalVisible]);

  return (
    <div>
      {!unitInfo && (
        <Button onClick={() => setModalVisible(true)}>填写单位信息</Button>
      )}
      {unitInfo && (
        <>
          <div>
            <div>
              <div>单位名称</div>
              <div>{unitInfo.fullName}</div>
            </div>
            <div>
              <div>联系人名称</div>
              <div>{unitInfo.contactPerson}</div>
            </div>
            <div>
              <div>联系人电话</div>
              <div>{unitInfo.contactPhone}</div>
            </div>
            <div>
              <div>联系人邮箱</div>
              <div>{unitInfo.contactEmail}</div>
            </div>
            <div>
              <Button onClick={() => setModalVisible(true)}>修改</Button>
            </div>
          </div>
        </>
      )}
      <Modal
        open={modalVisible}
        title="提交单位信息"
        destroyOnClose
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <UnitForm
          initialValue={unitInfo}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default Unit;
