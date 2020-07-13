import React, { useEffect } from "react";
import "./App.css";
import InstagramSignInPrompt from "./components/InstagramSignInPrompt";
import SignedInDisplay from "./components/SignedInDisplay.js";
import { retrieveAccessToken } from "./ApiHandler.js";

export default function App() {
  const [accessCode, setAccessCode] = React.useState(null);
  const [signedIn, setSignedIn] = React.useState(false);

  useEffect(() => {
    // Check for access code in URL
    if (accessCode == null) {
      const params = new URLSearchParams(window.location.search);
      if (params.has("code")) {
        let code = params.get("code");

        console.log(code);
        retrieveAccessToken(code);
        setAccessCode(code);
        setSignedIn(true);
      }
    }
  }, [accessCode]);

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
