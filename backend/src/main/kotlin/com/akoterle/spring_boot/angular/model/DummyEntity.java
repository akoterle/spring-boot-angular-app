package com.akoterle.spring_boot.angular.model;

import lombok.Data;

@Data
public class DummyEntity {
    private int id;
    private String name;
    public static DummyEntity of(final int id, final String name) {
        final DummyEntity dummyEntity = new DummyEntity();
        dummyEntity.setId(id);
        dummyEntity.setName(name);
        return dummyEntity;
    }
}
