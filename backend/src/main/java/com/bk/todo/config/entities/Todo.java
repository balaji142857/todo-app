package com.bk.todo.config.entities;

import com.bk.todo.model.Label;
import com.bk.todo.model.Priority;
import com.bk.todo.model.Status;

import java.time.LocalDateTime;
import java.util.List;

public class Todo {

    private Long id;
    private String title;
    private String description;
    private LocalDateTime due;
    private Priority priority;
    private Status status;
    private List<Label> labels;
}
