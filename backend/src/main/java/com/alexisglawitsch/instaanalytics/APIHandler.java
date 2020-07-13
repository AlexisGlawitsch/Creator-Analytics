package com.alexisglawitsch.instaanalytics;

import com.alexisglawitsch.instaanalytics.apidata.AccountInfo;
import com.alexisglawitsch.instaanalytics.apidata.AccountInsights;
import com.alexisglawitsch.instaanalytics.apidata.MediaInsights;
import com.alexisglawitsch.instaanalytics.apidata.TokenResponse;
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

import java.util.HashMap;

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

    private String buildBasicAccountURI(String userId, String accessToken) {
        return String.format("https://graph.instagram.com/%s" +
                "?fields=account_type,username" +
                "&access_token=%s", userId, accessToken);
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

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", this.clientId);
        requestBody.add("client_secret", "d042740794234aa781fa3f110cdc71a1");
        requestBody.add("code", accessCode.get("code"));
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("redirect_uri", this.authRedirectURI);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(requestBody, headers);
        try {
            TokenResponse response = restTemplate.postForObject(uri, entity, TokenResponse.class);

            logger.info(response.toString());
            return response;
        } catch (HttpClientErrorException e) {
            logger.info(e.getResponseBodyAsString());
            return e.getResponseBodyAsString();
        }
    }

    @GetMapping("/account/basic")
    public AccountInfo getAccountInfo(@RequestParam("userId") String userId,
                                      @RequestParam("accessToken") String accessToken) {
//        logger.info(params.toString());
//        String userId = params.get("params").get("userId");
//        String accessToken = params.get("params").get("accessToken");
        logger.info("Received user id " + userId + " and access token " + accessToken);
        String uri = buildBasicAccountURI(userId, accessToken);
        logger.info("Attempting to send request to " + uri);
        AccountInfo info = restTemplate.getForObject(uri, AccountInfo.class);
        logger.info(info.toString());
        return info;
    }

    @GetMapping("/account/insights")
    public AccountInsights getAccountInsights(String period) {
        String uri = buildAccountURI(period);
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
