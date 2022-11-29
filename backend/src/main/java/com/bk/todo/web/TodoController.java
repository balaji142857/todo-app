package com.bk.todo.web;

import com.bk.todo.TodoService;
import com.bk.todo.entities.TodoList;
import com.bk.todo.model.AuditModel;
import com.bk.todo.model.Priority;
import com.bk.todo.model.Status;
import com.bk.todo.model.TodoModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.history.Revision;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.sql.Array;
import java.time.LocalDate;
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

    @PostMapping
    public TodoModel save(@RequestBody TodoModel item) {
        log.info("Received save request {}",item);
        var dbEntity = entity(item);
        service.save(dbEntity);
        return item;
    }

    @GetMapping("/{id}")
    public TodoModel getTodo(@PathVariable Long id) {
        var item = service.get(id);
        return this.model(item);
    }

    @GetMapping("/{id}/audit")
    List<AuditModel> getRevisions(@PathVariable Long id) {
        var value =  service.getHistory(id);
        List<AuditModel> returnValue = new ArrayList<>();
        if (null != value) {
            List<Revision<Long, TodoList>> revisions =  value.getContent();
            for (Revision<Long, TodoList> revision : revisions) {
                returnValue.add(AuditModel.builder()
//                        .revision(revId.intValue())
                        .entity(revision.getEntity())
                        .type(revision.getMetadata().getRevisionType().name())
                        .revisionTime(revision.getMetadata().getRevisionInstant().orElse(null))
                        .build());
            }
        }
        return returnValue;
    }

    TodoList entity(TodoModel model) {
        TodoList entity = new TodoList();
        entity.setId(model.getId());
        entity.setDue(model.getDueBy());
        entity.setPriority(Priority.fromString(model.getPriority()));
        entity.setStatus(Status.fromString(model.getStatus()));
        entity.setItems(model.getItems());//TODO this is entity directly from UI
        if (!CollectionUtils.isEmpty(entity.getItems())) {
            entity.getItems().forEach(item -> item.setTodo(entity));
        }
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
                .items(entity.getItems())
                .status(entity.getStatus().getValue())
                .priority(entity.getPriority().name())
                .build();
    }

}
