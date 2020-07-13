package com.alexisglawitsch.instaanalytics;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class InstaAnalyticsController {
    APIHandler apiHandler;
    String accountId;

    public InstaAnalyticsController() {
        apiHandler = new APIHandler();
    }
}
