package com.alexisglawitsch.instaanalytics.apidata;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TokenResponse {
    private String user_id;
    private String access_token;

    @JsonProperty("user_id")
    public String getUserId() {
        return user_id;
    }

    @JsonProperty("access_token")
    public String getAccessToken() {
        return access_token;
    }

    @JsonProperty("user_id")
    public void setUserId(String id) {
        user_id = id;
    }

    @JsonProperty("access_token")
    public void setAccessToken(String token) {
        access_token = token;
    }

    public String toString() {
        return "User Id: " + user_id + "\nAccess Token: " + access_token;
    }
}
