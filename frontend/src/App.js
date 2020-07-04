import React from "react";
import FacebookLoginHandler from "./components/FacebookLoginHandler.js";
import "./App.css";

function App() {
  var facebookId = null;

  function setFacebookId(id) {
    facebookId = id;
    console.log("Facebook ID set to " + facebookId);
  }

  return (
    <div>
      <div className="App">
        <FacebookLoginHandler setId={setFacebookId} />
      </div>
    </div>
  );
}

export default App;
