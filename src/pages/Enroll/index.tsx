// 此页面用于展示赛事信息
import React, { useEffect, useState } from "react";
import { connect } from '@umijs/max';
import { Button, Row } from "antd";
import GameCard from "./GameCard";
import ItemCard from "./ItemCard";
import EnrollDetail from "./EnrollDetail";
import styles from './index.less';

type IProp = {
  game: any;
  dispatch: (params: { type: string; payload: any }) => void;
};

const Enroll: React.FC<IProp> = (props: IProp) => {

  const { game } = props;

  const [selectedGame, setSelectedGame] = useState<ADMIN.Game | null>(null);
  const [selectedItem, setSelectedItem] = useState<ADMIN.Item | null>(null);


  useEffect(() => {
    props.dispatch({
      type: "game/queryGame",
      payload: null
    });
  }, []);

  useEffect(() => {
    if (selectedGame?.id) {
      props.dispatch({
        type: "game/queryItem",
        payload: {
          gameId: selectedGame?.id
        }
      })
    }
  }, [selectedGame])

  const renderGameCards = () => {
    return game.games?.map((gameInfo: ADMIN.Game) => {
      return (
        <Row gutter={16}>
          <GameCard
            gameInfo={gameInfo}
            onClick={() => setSelectedGame(gameInfo)}
          />
        </Row>
      )
    })
  }

  const renderItemList = () => {
    return game.items?.map((item: ADMIN.Item) => (
      <ItemCard
        itemInfo={item}
        onClick={() => setSelectedItem(item)}
      />
    ))
  }

  const renderEnrollDetail = () => {
    return <EnrollDetail itemInfo={selectedItem}/>
  }

  const reset = () => {
    setSelectedGame(null);
    setSelectedItem(null);
  }


  return (
    <div className={styles["enroll-container"]}>
      {selectedGame &&
        <div className={styles["header"]}>
          {/* 渲染赛事名称 */}
          <div>{selectedGame?.name}</div>
          {
            selectedItem && <div>{selectedItem?.name}</div>
          }
          <Button onClick={reset}>返回赛事列表</Button>
          {/* 渲染项目名称 */}
        </div>
      }

      <div className={styles["content"]}>
        {
          !selectedGame
            ? renderGameCards()
            : !selectedItem
              ? renderItemList()
              : renderEnrollDetail()
        }
      </div>

    </div>
  )
}

export default connect(({ game }) => {
  return { game };
})(Enroll);