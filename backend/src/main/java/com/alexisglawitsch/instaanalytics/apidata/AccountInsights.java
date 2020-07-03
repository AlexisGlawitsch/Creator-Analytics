package com.alexisglawitsch.instaanalytics.apidata;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Map;

public class AccountInsights {
    private int impressions;
    private int reach;
    private int profile_views;

    @JsonProperty("data")
    private void unpackData(Map<String, ArrayList<Object>> data) {
        ArrayList<Object> dataList = data.get("data");

        for (int i = 0; i < dataList.size(); i++) {
            Map<String, Object> dataPiece = (Map<String, Object>) dataList.get(i);
            ArrayList valueList = (ArrayList)dataPiece.get("values");
            Map<String, Object> valueMap = (Map<String, Object>) valueList.get(0);
            int value = (int) valueMap.get("value");

            switch ((String)dataPiece.get("name")) {
                case "impressions":
                    this.impressions = value;
                    break;
                case "reach":
                    this.reach = value;
                    break;
                case "profile_views":
                    this.profile_views = value;
                    break;
            }
        }
    }

}
