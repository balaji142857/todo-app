package com.bk.todo.model;

import lombok.Getter;

@Getter
public enum Priority {
    LOW(100),
    MEDIUM(200),
    HIGH(300),
    CRITICAL(400);

    public final Integer code;

    Priority(Integer val) {
        this.code = val;
    }
}
