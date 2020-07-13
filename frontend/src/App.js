import React, { useEffect } from "react";
import "./App.css";
import InstagramSignInPrompt from "./components/InstagramSignInPrompt";
import SignedInDisplay from "./components/SignedInDisplay.js";
import { retrieveAccountInfo } from "./ApiHandler.js";

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userId, setUserId] = React.useState();
  const [signedIn, setSignedIn] = React.useState(false);

  useEffect(() => {
    // Check for access code in URL
    if (!signedIn) {
      const params = new URLSearchParams(window.location.search);
      if (params.has("code")) {
        let code = params.get("code");

        console.log(code);
        retrieveAccountInfo(code, setUserId, setAccessToken);
        setSignedIn(true);
      }
    }
  }, [signedIn]);

  return (
    <div>
      <div className="header">
        <h1>Creator Analytics</h1>
      </div>
      <div className="App">
        {signedIn ? <SignedInDisplay /> : <InstagramSignInPrompt />}
      </div>
    </div>
  );
}
