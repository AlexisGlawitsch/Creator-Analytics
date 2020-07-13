import axios from "axios";

const baseUri = "http://localhost:8080";

export const retrieveAccountInfo = (accessCode, setUserId, setAccessToken) => {
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
