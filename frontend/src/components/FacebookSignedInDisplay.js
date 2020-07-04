import React from "react";

export default function FacebookSignedInDisplay(props) {
  return (
    <div className="fb-signed-in">
      <p>Signed in as {props.name}</p>
      <img src={props.imgUrl}></img>
    </div>
  );
}
