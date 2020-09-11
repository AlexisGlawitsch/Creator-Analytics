import React from "react";
import "../App.css";

export default function Header({ signedIn, username }) {
  var welcomeText = "";
  var subheader = "";

  if (signedIn && username) {
    welcomeText = "Welcome, " + username;
    subheader = "You are a (account type) account";
  } else if (signedIn) {
    welcomeText = "Welcome";
    subheader =
      "Please select the Facebook page that is linked to your Instagram account";
  } else {
    welcomeText = "Welcome";
    subheader = "Please sign in to continue";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="welcome">{welcomeText}</p>
      <p className="subheader">{subheader}</p>
    </div>
  );
}
