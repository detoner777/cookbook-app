import React from "react";

const Description = ({ location }) => {
  const { state = {} } = location;
  // console.log(state.name);
  return <div> {state.name}</div>;
};
export default Description;
