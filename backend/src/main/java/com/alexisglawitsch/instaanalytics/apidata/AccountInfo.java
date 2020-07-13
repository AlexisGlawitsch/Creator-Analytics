package com.alexisglawitsch.instaanalytics.apidata;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccountInfo {
    private String account_type;
    private String username;

    @JsonProperty("account_type")
    public String getAccountType() {
        return account_type;
    }

    public String getUsername() {
        return username;
    }

    @JsonProperty("account_type")
    public void setAccountType(String type) {
        account_type = type;
    }

    public void setUsername(String name) {
        username = name;
    }
}
