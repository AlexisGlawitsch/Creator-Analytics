// Makes an API request to Facebook to get a list of pages associated with the signed in user.
// Should be moved to backend eventually.

import React from "react";
import { retrieveAccountInfo } from "../ApiHandler.js";

export default function FacebookPageHandler({
  token,
  setPageId,
  setUserId,
  setAccountChosen,
}) {
  const [errorMessage, setErrorMessage] = React.useState();
  const [apiRequestExecuted, setApiRequestExecuted] = React.useState();

  React.useEffect(() => {
    console.log("In useEffect hook, token: " + token);
    if (window.FB && token) {
      console.log("Executing");
      var queryUri = "/me/accounts?access_token=" + token;
      window.FB.api(queryUri, function (response) {
        console.log("FB Pages Response: " + JSON.stringify(response));

        if (response.data) {
          // If there are multiple valid pages, we need the user to select one
          if (response.data.length > 1) {
            console.log("Multiple pages");
          } else {
            console.log(
              "Selected page " +
                response.data[0].name +
                " with id " +
                response.data[0].id
            );
          }

          // Temporary, for now will always select first page in list
          setPageId(response.data[0].id);
          setAccountChosen(true);

          retrieveAccountInfo(token, response.data[0].id, setUserId);
        } else if (response.error) {
          console.log(response.error);
          setErrorMessage(response.error.message);
        } else {
          setAccountChosen(true);
          console.log("No connected Facebook pages");
        }
      });
    }
  }, [apiRequestExecuted]);

  // This means something went wrong
  if (!window.FB || !token) {
    console.log(
      "window.FB or access token were null when trying to access connected Facebook pages"
    );

    return null;
  }

  if (!apiRequestExecuted) {
    setApiRequestExecuted(true);
  }

  if (errorMessage) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Oops! Something went wrong when calling the Facebook Pages API.</p>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return null;
}
