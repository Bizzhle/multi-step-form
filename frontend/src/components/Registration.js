import React from "react";
import { useParams } from "react-router-dom";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

export const Registration = (props) => {
  const { id } = useParams();

  switch (id) {
    case "1":
      return <FirstStep user={props.user} updateUser={props.updateUser} />;
    case "2":
      return <SecondStep user={props.user} updateUser={props.updateUser} />;
    case "3":
      return <ThirdStep user={props.user} updateUser={props.updateUser} />;
    default:
      return <FirstStep user={props.user} updateUser={props.updateUser} />;
  }
};
