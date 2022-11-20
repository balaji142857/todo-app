package com.bk.todo.model;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Data
public class Todo {

    private Long id;
    private List<Label> labels;
    private Priority priority;
    private String title;
    private String description;
    private LocalDateTime due;

}