package com.akoterle.spring_boot.angular.api;

import com.akoterle.spring_boot.angular.model.DummyEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping("/api/list")
public class ApiController {

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<DummyEntity> list() {

        return Arrays.asList(DummyEntity.of(1, "H1"), DummyEntity.of(2, "H2"));
    }
}

