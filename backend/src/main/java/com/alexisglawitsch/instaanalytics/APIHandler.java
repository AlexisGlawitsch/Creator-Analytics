package com.alexisglawitsch.instaanalytics;

import com.alexisglawitsch.instaanalytics.apidata.AccountInsights;
import com.alexisglawitsch.instaanalytics.apidata.MediaInsights;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.HttpURLConnection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = { "https://localhost:3000"})
@RestController
public class APIHandler {
    private String accountId;
    private String clientId;
    private String authRedirectURI;
    private RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(APIHandler.class);

    public APIHandler() {
        this.authRedirectURI = "https://localhost:3000/";
        this.clientId = "3305985632787191";
        this.restTemplate = new RestTemplate();
    }

    private String buildAccountURI(String period) {
        return String.format("graph.facebook.com/%s/insights" +
                "?metric=impressions,reach,profile_views" +
                "&period=%s", accountId, period);
    }

    private String buildMediaURI(String mediaId) {
        return String.format("graph.facebook.com/%s/insights\n" +
                "?metric=engagement,impressions,reach", mediaId);
    }

    @PostMapping("/auth")
    public Object exchangeForToken(@RequestBody HashMap<String, String> accessCode) {
        String uri = "https://api.instagram.com/oauth/access_token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", this.clientId);
        requestBody.add("client_secret", "d042740794234aa781fa3f110cdc71a1");
        requestBody.add("code", accessCode.get("code"));
        logger.info("Logging access code: " + accessCode);
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("redirect_uri", this.authRedirectURI);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(requestBody, headers);
        try {
            logger.info("Logging entity: " + entity.toString());
            TokenResponse response = restTemplate.postForObject(uri, entity, TokenResponse.class);

            logger.info(response.toString());
            return response;
        } catch (HttpClientErrorException e) {
            logger.info(e.getResponseBodyAsString());
            return e.getResponseBodyAsString();
        }
    }

    public AccountInsights getAccountInsights(String period) {
        String uri = buildAccountURI(period);
        return restTemplate.getForObject(uri, AccountInsights.class);
    }

    public MediaInsights getMediaInsights(String mediaId) {
        String uri = buildMediaURI(mediaId);
        return restTemplate.getForObject(uri, MediaInsights.class);
    }
}

class TokenResponse {
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
