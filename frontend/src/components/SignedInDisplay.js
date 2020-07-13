import React from "react";
import Card from "@material-ui/core/Card";

export default function SignedInDisplay(props) {
  return (
    <Card className="signed-in-card">
      <div>
        <div className="signed-in-info">
          <p style={{ margin: "0px" }}>Signed in as</p>
          <p className="username">{props.username}</p>
        </div>
      </div>
    </Card>
  );
}
