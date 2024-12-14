import React from "react";
import { Card } from "antd";

const { Meta } = Card;

type GameCardProps = {
  gameInfo: ADMIN.Game;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = (props: GameCardProps) => {

  const { gameInfo } = props;

  return (
    <Card
      hoverable
      title={gameInfo.name}
      style={{ width: "100%" }}
      extra={<a>进入报名</a>}
      onClick={() => props.onClick()}
    >
      <Meta
        title={`${gameInfo.startTime.substring(0, 10)} 至 ${gameInfo.endTime.substring(0, 10)}`}
        description={`${gameInfo.matchAddress}`}
      />
    </Card>
  )
}

export default GameCard;