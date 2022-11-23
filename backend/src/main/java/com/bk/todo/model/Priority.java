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

    public static Priority fromString(String text) {
        for (Priority b : Priority.values()) {
            if (b.name().equalsIgnoreCase(text)) {
                return b;
            }
        }
        throw new IllegalArgumentException("Invalid value "+text +" for " + Status.class.getName() +" enum");
    }
}
