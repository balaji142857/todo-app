package com.bk.todo.web;

import com.bk.todo.TodoService;
import com.bk.todo.entities.TodoList;
import com.bk.todo.model.Priority;
import com.bk.todo.model.Status;
import com.bk.todo.model.TodoModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.bk.todo.model.Priority.*;
import static com.bk.todo.model.Status.*;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
@Slf4j
public class TodoController {

    private final TodoService service;

    @GetMapping("/list")
    public List<TodoModel> list1() {
        var items = service.findAll();
        var result =  items.stream().map(this::model).toList();
        return result;
    }

    @GetMapping
    public List<TodoModel> list() {
        return List.of(
                TodoModel.builder().dueBy(LocalDateTime.now()).labels(List.of(1L)).status(IN_PROGRESS.getValue()).id(1L).priority(CRITICAL.name()).title("Critical Task").description("some critical desc").build(),
                TodoModel.builder().dueBy(LocalDateTime.now()).labels(List.of(2L,3L)).status(COMPLETED.getValue()).id(2L).priority(HIGH.name()).title("High Task").description("some high desc").build(),
                TodoModel.builder().dueBy(LocalDateTime.now()).labels(List.of(4L)).status(TBD.getValue()).id(3L).priority(MEDIUM.name()).title("Medium Task").description("some medium desc").build(),
                TodoModel.builder().dueBy(LocalDateTime.now()).id(4L).status(ON_HOLD.getValue()).priority(LOW.name()).title("Low Task").description("some low desc").build());
    }

    @PostMapping
    public TodoModel save(@RequestBody TodoModel item) {
        log.info("Received save request {}",item);
        var dbEntity = entity(item);
        service.save(dbEntity);
        return item;
    }

    TodoList entity(TodoModel model) {
        TodoList entity = new TodoList();
        entity.setId(model.getId());
        entity.setDue(model.getDueBy());
        entity.setPriority(Priority.fromString(model.getPriority()));
        entity.setStatus(Status.fromString(model.getStatus()));
        entity.setItems(model.getItems());//TODO this is entity directly from UI
//        entity.setLabels(model.getLabels()); TODO
        entity.setDescription(model.getDescription());
        entity.setTitle(model.getTitle());
        return entity;
    }

    TodoModel model(TodoList entity) {
        var model = new TodoModel();
        return TodoModel.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .dueBy(entity.getDue())
                .description(entity.getDescription())
                .labels(null != entity.getLabels() ? entity.getLabels().stream().map(label -> label.getId()).toList() : new ArrayList<>())
//                .items(entity.getItems())
                .status(entity.getStatus().getValue())
                .priority(entity.getPriority().name())
                .build();
    }
}
