import React from "react";

export default function FacebookPageHandler(props) {
  var queryUri = "/me/accounts?access_token=" + props.token;
  var hasPage = false;

  const [pageName, setPageName] = React.useState();

  // Check if FB has been initialized and the user is logged in
  if (window.FB && props.token) {
    window.FB.api(queryUri, function (response) {
      console.log(response);
      if (response.data.length > 0) {
        hasPage = true;
        props.setPageId(response.data[0].id);
        setPageName(response.data[0].name);
      } else {
        console.log("No connected Facebook pages");
      }
    });
  } else {
    return null;
  }

  if (!hasPage) {
    return (
      <div>
        <p>
          This Facebook account does not have administrative permissions on any
          Facebook pages.
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Linked to Facebook page {pageName}.</p>
      </div>
    );
  }
}
