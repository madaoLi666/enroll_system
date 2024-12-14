import React from "react";
import { Card } from "antd";
import styles from "./index.less";

const { Meta } = Card;

const ItemCard = (props: { itemInfo: ADMIN.Item, onClick: () => void }) => {
  const { itemInfo } = props;
  return (
    <>
      <div className={styles["item-card"]} onClick={props.onClick}>
        <div className={styles["item-card-header"]}>
          {itemInfo.name}
        </div>
        <div className={styles["item-card-content"]}>
          <div>
            年龄段限制：{`${itemInfo.maxAge.substring(0, 10)} 至 ${itemInfo.minAge.substring(0, 10)}`}
          </div>
          <div>
            {`本项目限${itemInfo.limitedNumber}个报名`}
          </div>
        </div>
      </div>
    </>

  )
}

export default ItemCard;