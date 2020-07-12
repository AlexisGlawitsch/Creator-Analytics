import React, { useEffect, Suspense } from "react";
import FacebookLogin from "react-facebook-login";
import FacebookSignedInDisplay from "./FacebookSignedInDisplay";

function SDKLoader() {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: "291539642200299",
      cookie: true,
      xfbml: true,
      version: "v7.0",
    });

    window.FB.AppEvents.logPageView();
  };

  // Load Facebook SDK
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}

export default function FacebookLoginHandler(props) {
  SDKLoader();

  const [login, setLogin] = React.useState();
  const [data, setData] = React.useState();

  // const checkLoginStatus = () => {
  //   window.FB.getLoginStatus(function (response) {
  //     switch (response.status) {
  //       case "connected":
  //         console.log("Response status: connected");
  //         window.FB.api("/me", function (response) {
  //           console.log("Successful login for: " + response.name);
  //         });
  //         setLogin(true);
  //         console.log("Set login to true");
  //         break;
  //       case "not_authorized":
  //         console.log("Response status: Not authorized");
  //         break;
  //       case "unknown":
  //         console.log("Unknown");
  //         break;
  //       default:
  //         console.log(response.status);
  //         console.log("Response status: Unexpected response status");
  //     }
  //   });
  // };

  const readAccountData = (response) => {
    console.log(response);
    setData(response);
    props.setId(response.id);

    if (response.accessToken) {
      props.setToken(response.accessToken);
      setLogin(true);
    }
  };

  return (
    <div>
      {/* {window.FB && !login && checkLoginStatus()} */}
      {/*If the user is not logged in, display login button*/}
      {!login && (
        <div>
          <p>
            In order to use this service, you must have an Instagram business or
            creator account that has a linked Facebook page.
          </p>
          <FacebookLogin
            appId="291539642200299"
            autoLoad={true}
            fields="id, name, picture"
            callback={readAccountData}
            icon="fa-facebook"
          />
        </div>
      )}
      {/*If the user is logged in, display the account they are logged in as*/}
      {login && (
        <div>
          <FacebookSignedInDisplay
            name={data.name}
            imgUrl={data.picture.data.url}
          />
          <button
            onClick={() => {
              console.log("Attempting to log out of Facebook account");
              window.FB.logout((response) => {
                console.log("Logged out successfully");
                setLogin(false);
                setData({});
              });
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
