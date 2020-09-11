import React, { useEffect } from "react";
import "./App.css";
import FacebookPageHandler from "./components/FacebookPageHandler";
import FacebookLoginHandler from "./components/FacebookLoginHandler.js";
import Header from "./components/Header.js";
import MainDisplay from "./components/MainDisplay.js";
import {
  retrieveApiParameters,
  retrieveAccountInfo,
  retrieveAccountInsights,
} from "./ApiHandler.js";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [facebookId, setFacebookId] = React.useState();
  const [userId, setUserId] = React.useState();
  const [pageId, setPageId] = React.useState();
  const [username, setUsername] = React.useState();
  const [accountType, setAccountType] = React.useState();
  const [signedIn, setSignedIn] = React.useState(false);
  const [accountChosen, setAccountChosen] = React.useState(false);

  useEffect(() => {
    console.log("Signed in: " + signedIn);
    console.log("User ID: " + userId);
    console.log("Access Token: " + accessToken);

    if (signedIn && userId && accessToken) {
      retrieveAccountInfo(userId, accessToken, setUsername, setAccountType);
      retrieveAccountInsights(userId);
    }
  }, [signedIn, userId, accessToken]);

  return (
    <div className="main">
      <Grid
        className="header"
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Header signedIn={signedIn} username={username} />
        <div>
          {signedIn ? (
            accountChosen && (
              <Button
                onClick={() => {
                  console.log("Attempting to log out of Facebook account");
                  window.FB.logout((response) => {
                    console.log("Logged out successfully");
                    setSignedIn(false);
                  });
                }}
              >
                SIGN OUT
              </Button>
            )
          ) : (
            <FacebookLoginHandler
              setAccessToken={setAccessToken}
              setSignedIn={setSignedIn}
              setId={setFacebookId}
            />
          )}
        </div>
      </Grid>

      {accountChosen ? (
        !pageId && (
          <div>
            <p>
              This Facebook account does not have administrative permissions on
              any Facebook pages.
            </p>
          </div>
        )
      ) : (
        <FacebookPageHandler
          token={accessToken}
          setPageId={setPageId}
          setUserId={setUserId}
          setAccountChosen={setAccountChosen}
        />
      )}

      <div className="body">
        <MainDisplay signedIn={accountChosen} />
      </div>

      <div className="footer">
        <p>
          Creator Analytics can only track your account statistics after the
          first time you've logged in - we can't retroactively collect data from
          beforehand. After the first time you log in, we'll automatically poll
          the Instagram API for the latest statistics, so don't worry about
          logging in daily!
        </p>

        {signedIn && username && <button>STOP TRACKING MY ACCOUNT</button>}
      </div>
    </div>
  );
}
