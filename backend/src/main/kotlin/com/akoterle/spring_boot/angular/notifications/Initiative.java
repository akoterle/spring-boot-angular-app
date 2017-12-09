package com.akoterle.spring_boot.angular.notifications;

import lombok.Data;

@Data
public class Initiative {
    private long id;
    private String code;
    private String title;
    static public Initiative of(long id, String code, String title) {
        final Initiative initiative = new Initiative();
        initiative.setId(id);
        initiative.setCode(code);
        initiative.setTitle(title);
        return initiative;

    }
}
