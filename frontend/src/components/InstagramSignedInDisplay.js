import React from "react";
import Card from "@material-ui/core/Card";

export default function InstagramSignedInDisplay(props) {
  return (
    <Card className="signed-in-card">
      <div>
        <div className="signed-in-info">
          <p style={{ margin: "0px" }}>
            Signed in as{" "}
            {props.accountType === "MEDIA_CREATOR" ? "Creator" : "Business"}
          </p>
          <p className="username">{props.username}</p>
        </div>
      </div>
    </Card>
  );
}
