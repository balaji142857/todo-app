package com.bk.todo.web;

import com.bk.todo.model.TodoModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.bk.todo.model.Priority.*;
import static com.bk.todo.model.Status.*;

@RestController
@RequestMapping("/todos")
public class TodoController {

    @GetMapping
    public List<TodoModel> list() {
        return List.of(
                TodoModel.builder().labels(List.of(1)).status(IN_PROGRESS.getValue()).id(1L).priority(CRITICAL.name()).title("Critical Task").description("some critical desc").build(),
                TodoModel.builder().labels(List.of(2,3)).status(COMPLETED.getValue()).id(2L).priority(HIGH.name()).title("High Task").description("some high desc").build(),
                TodoModel.builder().labels(List.of(4)).status(TBD.getValue()).id(3L).priority(MEDIUM.name()).title("Medium Task").description("some medium desc").build(),
                TodoModel.builder().id(4L).status(ON_HOLD.getValue()).priority(LOW.name()).title("Low Task").description("some low desc").build());
    }
}
