package com.bk.todo.model;

import lombok.Getter;

@Getter
public enum Status {

    IN_PROGRESS("IN PROGRESS"), ON_HOLD("HOLD"), COMPLETED("COMPLETED"), TBD("TBD");

    private final String value;

    Status(String value) {
        this.value = value;
    }
}
