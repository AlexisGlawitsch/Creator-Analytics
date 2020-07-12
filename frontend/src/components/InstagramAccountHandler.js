import React from "react";

export default function InstagramAccountHandler(props) {
  var queryUri =
    "/" +
    props.pageId +
    "?fields=instagram_business_account&access_token=" +
    props.token;

  if (window.FB && props.token) {
    window.FB.api(queryUri, function (response) {
      if (response) {
        console.log(response);
        props.setId(response.instagram_business_account.id);
      }
    });
  } else {
    return null;
  }
}
