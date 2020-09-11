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

export const retrieveAccountInfo = (accessToken, pageId, setUserId) => {
  axios
    .post(baseUri + "/auth", { pageId: pageId, accessToken: accessToken })
    .then((response) => {
      console.log(response);
      setUserId(response.data.account_id);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const retrieveAccountInsights = (id) => {
  axios
    .get(baseUri + "/account/insights", { params: { userId: id } })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {});
};
