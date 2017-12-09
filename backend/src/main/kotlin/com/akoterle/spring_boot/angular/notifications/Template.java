package com.akoterle.spring_boot.angular.notifications;

import lombok.Data;

@Data
public class Template {
    private long id;
    private String name;
    private String language;
    public static Template of (long id, String name, String language) {
        Template template = new Template();
        template.setId(id);
        template.setName(name);
        template.setLanguage(language);
        return template;
    }
}
