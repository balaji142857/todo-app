package com.bk.todo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditModel<T> {

    private Integer revision;
    private String type;
    private Instant revisionTime;
    private T entity;

}
