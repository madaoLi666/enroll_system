import React, { useEffect } from "react";
import { connect } from "@umijs/max";

type EnrollDetailProp = {
  itemInfo: ADMIN.Item | null;
  dispatch: (params: { type: string; payload: any }) => void;
}

const EnrollDetail: React.FC<EnrollDetailProp> = (props: EnrollDetailProp) => {
  console.log(props.athlete);
  useEffect(() => {
    const userId = sessionStorage.getItem('userId') as string;
    props.dispatch({
      type: "athlete/queryAthlete",
      payload: { userId }
    })
  }, [])

  return (
    <div>
      {props?.itemInfo?.name}
    </div>
  )
}

export default connect(({ athlete }) => {
  return {
    athlete
  }
})(EnrollDetail);