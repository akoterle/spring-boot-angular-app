package com.akoterle.spring_boot.angular.api;

import com.akoterle.spring_boot.angular.model.DummyEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping("/api")
public class ApiController {

    @RequestMapping(path = "/list", method = RequestMethod.GET)
    @ResponseBody
    public List<DummyEntity> list() {

        return Arrays.asList(DummyEntity.of(1, "H1"), DummyEntity.of(2, "H2"));
    }

    @PostMapping("/upload/image")
    @ResponseBody
    public void uploadImage(@RequestParam("file") MultipartFile file) {

        String name = file.getName();

    }

}

