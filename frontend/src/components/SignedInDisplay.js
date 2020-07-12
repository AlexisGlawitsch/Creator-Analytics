import React from "react";

export default function SignedInDisplay(props) {
  return (
    <div>
      <p>Signed in as {props.username}</p>
    </div>
  );
}
