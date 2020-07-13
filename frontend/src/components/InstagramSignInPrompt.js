import React from "react";
import Button from "@material-ui/core/Button";

export default function InstagramSignInPrompt() {
  return (
    <div>
      <Button
        style={{ maxHeight: "50px" }}
        href="https://www.instagram.com/oauth/authorize?client_id=3305985632787191&redirect_uri=https://localhost:3000/&scope=user_profile&response_type=code"
        variant="contained"
        color="primary"
      >
        Sign In
      </Button>
    </div>
  );
}
