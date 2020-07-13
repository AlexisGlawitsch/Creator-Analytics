import React, { useEffect } from "react";
import "./App.css";
import InstagramSignInPrompt from "./components/InstagramSignInPrompt";
import SignedInDisplay from "./components/SignedInDisplay.js";
import { retrieveApiParameters, retrieveAccountInfo } from "./ApiHandler.js";
import Grid from "@material-ui/core/Grid";

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userId, setUserId] = React.useState();
  const [username, setUsername] = React.useState();
  const [accountType, setAccountType] = React.useState();
  const [signedIn, setSignedIn] = React.useState(false);

  useEffect(() => {
    // Check for access code in URL
    console.log("Checking for access code");
    if (!signedIn) {
      const params = new URLSearchParams(window.location.search);
      if (params.has("code")) {
        let code = params.get("code");
        console.log("Attempting to retrieve API params");
        retrieveApiParameters(code, setUserId, setAccessToken);
        setSignedIn(true);
      }
    }
  }, [signedIn]);

  useEffect(() => {
    console.log("Signed in: " + signedIn);
    console.log("User ID: " + userId);
    console.log("Access Token: " + accessToken);

    if (signedIn && userId && accessToken) {
      retrieveAccountInfo(userId, accessToken, setUsername, setAccountType);
    }
  }, [signedIn, userId, accessToken]);

  return (
    <div className="main">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        style={{ marginBottom: "50px" }}
      >
        <h1 className="header">Creator Analytics</h1>

        <div className="account-container">
          {signedIn && username ? (
            <SignedInDisplay username={username} />
          ) : (
            <InstagramSignInPrompt />
          )}
        </div>
      </Grid>

      <div className="body">
        <p className="sign-in-info">
          You need to be signed in to Instagram with a Business or Creator
          account to use this app.
        </p>
      </div>
    </div>
  );
}
