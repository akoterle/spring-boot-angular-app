package com.akoterle.spring_boot.angular.notifications;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping("/notification/v1/")
public class NotificationsController {
    @RequestMapping(path = "/initiatives", method = RequestMethod.GET)
    @ResponseBody
    public List<Initiative> initiatives() {


        return Arrays.asList(Initiative.of(1, "I1", "Initiative1"), Initiative.of(2, "I2", "Initiative2"));
    }

    @RequestMapping(path = "/templates", method = RequestMethod.GET)
    @ResponseBody
    public List<Template> templates() {


        return Arrays.asList(Template.of(1, "Template1", "en"), Template.of(2, "Template2", "en"));
    }

}
