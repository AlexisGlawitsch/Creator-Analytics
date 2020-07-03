package com.alexisglawitsch.instaanalytics;

import com.alexisglawitsch.instaanalytics.apidata.AccountInsights;
import com.alexisglawitsch.instaanalytics.apidata.MediaInsights;
import org.springframework.web.client.RestTemplate;

public class APIHandler {
    private String accountId;

    public APIHandler(String accountId) {
        this.accountId = accountId;
    }

    private String buildAccountURI(String period) {
        return String.format("graph.facebook.com/%s/insights\n" +
                "    ?metric=impressions,reach,profile_views\n" +
                "    &period=%s", accountId, period);
    }

    private String buildMediaURI(String mediaId) {
        return String.format("graph.facebook.com/%s/insights\n" +
                "?metric=engagement,impressions,reach", mediaId);
    }

    public AccountInsights parseAccountInsights(String period) {
        String uri = buildAccountURI(period);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, AccountInsights.class);
    }

    public MediaInsights parseMediaInsights(String mediaId) {
        String uri = buildMediaURI(mediaId);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, MediaInsights.class);
    }


}
