import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ResultList from "../../utility/ResultList";

type Props = {};

const AnnotationResultList: React.FC<Props & RouteComponentProps> = (props) => {
  return (
    <>
      <ResultList
        apiPath={"annot"}
        frontendPath={"annotation"}
        history={props.history}
        location={props.location}
        match={props.match}
      />
    </>
  );
};

export default AnnotationResultList;
