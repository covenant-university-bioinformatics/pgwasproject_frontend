import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ResultList from "../../utility/ResultList";

type Props = {};

const DivanResultList: React.FC<Props & RouteComponentProps> = (props) => {
  return (
    <>
      <ResultList
        apiPath={"divan"}
        frontendPath={"divan"}
        history={props.history}
        location={props.location}
        match={props.match}
      />
    </>
  );
};

export default DivanResultList;
