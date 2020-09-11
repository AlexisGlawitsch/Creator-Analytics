package com.alexisglawitsch.instaanalytics.apidata;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;

public class AccountId {
    private String pageId;
    private String accountId;

    @JsonProperty("id")
    public String getPageId() {
        return this.pageId;
    }

    @JsonProperty("account_id")
    public String getAccountId() {
        return this.accountId;
    }

    @JsonProperty("id")
    public void setPageId(String pageId) {
        this.pageId = pageId;
    }

    @JsonProperty("account_id")
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @JsonProperty("instagram_business_account")
    private void unpackAccountId(HashMap<String, Object> accountInfo) {
        HashMap<String, String> businessAcct = (HashMap<String, String>)accountInfo.get("instagram_business_account");
        this.accountId = businessAcct.get("id");
    }
}
