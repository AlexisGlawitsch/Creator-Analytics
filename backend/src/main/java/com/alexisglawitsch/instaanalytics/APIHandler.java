package com.alexisglawitsch.instaanalytics;

import com.alexisglawitsch.instaanalytics.apidata.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
public class APIHandler {
    private String accountId;
    private String authRedirectURI;
    private RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(APIHandler.class);

    public APIHandler() {
        this.authRedirectURI = "https://localhost:3000/";
        this.restTemplate = new RestTemplate();
    }

    private String buildBasicAccountURI(String userId, String accessToken) {
        return String.format("https://graph.instagram.com/%s" +
                "?fields=account_type,username" +
                "&access_token=%s", userId, accessToken);
    }

    private String buildAccountURI(String userId) {
        return String.format("graph.facebook.com/%s/insights" +
                "?metric=impressions,reach,profile_views" +
                "&period=day", userId);
    }

    private String buildMediaURI(String mediaId) {
        return String.format("graph.facebook.com/%s/insights\n" +
                "?metric=engagement,impressions,reach", mediaId);
    }

    @CrossOrigin(origins = { "https://localhost:3000" })
    @GetMapping("/auth")
    public Object getInstagramAccountId(@RequestParam("pageId") String pageId,
                                        @RequestParam("accessToken") String accessToken) {
        String uri = String.format("https://graph.facebook.com/v8.0/%s?fields=instagram_business_account" +
                "&access_token=%s", pageId, accessToken);
        logger.info("Attempting to send request to " + uri);

        return restTemplate.getForObject(uri, AccountId.class);
    }

//    @PostMapping("/auth")
//    public Object exchangeForToken(@RequestBody HashMap<String, String> accessCode) {
//        String uri = "https://api.instagram.com/oauth/access_token";
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
//        requestBody.add("client_id", this.clientId);
//        requestBody.add("client_secret", "d042740794234aa781fa3f110cdc71a1");
//        requestBody.add("code", accessCode.get("code"));
//        requestBody.add("grant_type", "authorization_code");
//        requestBody.add("redirect_uri", this.authRedirectURI);
//
//        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(requestBody, headers);
//        try {
//            TokenResponse response = restTemplate.postForObject(uri, entity, TokenResponse.class);
//
//            logger.info(response.toString());
//            return response;
//        } catch (HttpClientErrorException e) {
//            logger.info(e.getResponseBodyAsString());
//            return e.getResponseBodyAsString();
//        }
//    }

    @GetMapping("/account/basic")
    public BasicAccountInfo getAccountInfo(@RequestParam("userId") String userId,
                                           @RequestParam("accessToken") String accessToken) {
//        logger.info(params.toString());
//        String userId = params.get("params").get("userId");
//        String accessToken = params.get("params").get("accessToken");
        logger.info("Received user id " + userId + " and access token " + accessToken);
        String uri = buildBasicAccountURI(userId, accessToken);
        logger.info("Attempting to send request to " + uri);
        BasicAccountInfo info = restTemplate.getForObject(uri, BasicAccountInfo.class);
        logger.info(info.toString());
        return info;
    }

    @GetMapping("/account/detailed")
    public DetailedAccountInfo getDetailedAccountInfo() {
        return null;
    }

    @GetMapping("/account/insights")
    public AccountInsights getAccountInsights(@RequestParam("userId") String userId) {
        String uri = buildAccountURI(userId);
        logger.info("Attempting to send request to " + uri);
        AccountInsights insights = restTemplate.getForObject(uri, AccountInsights.class);
        logger.info(insights.toString());
        return insights;
    }

    @GetMapping("/media")
    public MediaInsights getMediaInsights(String mediaId) {
        String uri = buildMediaURI(mediaId);
        MediaInsights insights = restTemplate.getForObject(uri, MediaInsights.class);
        logger.info(insights.toString());
        return insights;
    }
}
