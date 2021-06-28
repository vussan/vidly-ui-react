import React from "react";
const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.Liked) classes += "-o";

  return (
    <i
      onClick={props.onToggleLike}
      className={classes}
      aread-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
