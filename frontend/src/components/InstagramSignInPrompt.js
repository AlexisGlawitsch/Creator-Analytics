import React from "react";

export default function InstagramSignInPrompt() {
  return (
    <div>
      You need to be signed in to Instagram to use this app.{" "}
      <a
        href="https://www.instagram.com/oauth/authorize?client_id=3305985632787191&redirect_uri=https://localhost:3000/&scope=user_profile&response_type=code"
        className="btn btn-primary"
      >
        Sign In
      </a>
    </div>
  );
}
