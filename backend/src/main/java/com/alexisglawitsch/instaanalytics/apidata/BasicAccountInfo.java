package com.alexisglawitsch.instaanalytics.apidata;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BasicAccountInfo {
    private String account_type;
    private String username;

    @JsonProperty("account_type")
    public String getAccountType() {
        return this.account_type;
    }

    public String getUsername() {
        return this.username;
    }

    @JsonProperty("account_type")
    public void setAccountType(String type) {
        this.account_type = type;
    }

    public void setUsername(String name) {
        this.username = name;
    }
}
