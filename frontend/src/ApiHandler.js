import axios from "axios";

const baseUri = "http://localhost:8080";

export const retrieveAccessToken = (accessCode) => {
  axios
    .post(baseUri + "/auth", { code: accessCode })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
