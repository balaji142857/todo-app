package com.bk.todo.model;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Data
@Builder
public class TodoModel {

    private Long id;
    private List<Integer> labels;
    private String priority;
    private String title;
    private String description;
    private LocalDateTime due;
    private String status;

}