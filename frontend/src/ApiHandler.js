import axios from "axios";

const baseUri = "http://localhost:8080";

export const retrieveApiParameters = (
  accessCode,
  setUserId,
  setAccessToken
) => {
  axios
    .post(baseUri + "/auth", { code: accessCode })
    .then((response) => {
      console.log(response);
      setUserId(response.data.user_id);
      setAccessToken(response.data.access_token);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const retrieveAccountInfo = (id, token, setUsername, setAccountType) => {
  axios
    .get(baseUri + "/account/basic", {
      params: { userId: id, accessToken: token },
    })
    .then((response) => {
      console.log(response);
      setUsername(response.data.username);
      setAccountType(response.data.account_type);
    })
    .catch((error) => {
      console.log(error);
    });
};
