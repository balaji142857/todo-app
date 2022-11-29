package com.bk.todo.model;

import com.bk.todo.entities.TodoItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoModel {

    private Long id;
    private List<Long> labels;
    private String priority;
    private String title;
    private String description;
    private LocalDate dueBy;
    private String status;
    @Builder.Default
    private List<TodoItem> items = new ArrayList<>();

}