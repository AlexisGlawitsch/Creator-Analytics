import React from "react";
import DataView from "./DataView.js";
import "../App.css";

export default function MainDisplay({ signedIn }) {
  if (!signedIn) {
    return (
      <p className="sign-in-info">
        Once you have signed in, your account insights will appear here.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DataView />
      <DataView />
      <DataView />
    </div>
  );
}
