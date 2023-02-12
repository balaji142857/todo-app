package com.bk.todo.web;

import com.bk.todo.entities.Label;
import com.bk.todo.service.LabelService;
import com.bk.todo.service.TodoService;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
@Slf4j
public class TodoController {

    private final TodoService service;
    private final LabelService labelService;

    @GetMapping("/test")
    public List<TodoModel> test() {
        return  service.findOpenLists().stream().map(this::model).toList();
    }

    @GetMapping("/list")
    public List<TodoModel> list() {
        return listInternal(true);
    }

    @GetMapping("/listSevenDays")
    public List<TodoModel> listAll() {
        return listInternal(false);
    }

    @PostMapping("/{id}/delete")
    public void delete(@PathVariable Long id) {
        log.info("Received delete request {}",id);
        service.delete(id);
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
        entity.setLabels(something(model.getLabels()));
        entity.setDescription(model.getDescription());
        entity.setTitle(model.getTitle());
        return entity;
    }

    private List<Label> something(List<Long> labels) {
        if (CollectionUtils.isEmpty(labels)) {
            return List.of();
        }
        return labelService.findAllById(labels);
    }

    private TodoModel model(TodoList entity) {
        var model = new TodoModel();
        return TodoModel.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .dueBy(entity.getDue())
                .description(entity.getDescription())
                .labels(null != entity.getLabels() ? entity.getLabels().stream().map(Label::getId).toList() : new ArrayList<>())
                .items(entity.getItems())
                .status(entity.getStatus().getValue())
                .priority(entity.getPriority().name())
                .build();
    }


    private List<TodoModel> listInternal(boolean showAllCompleted) {
        var items = service.findAll();
        LocalDate ld = LocalDate.now().minusDays(7);
        var result =  items.stream()
                .map(this::model)
                .filter(i -> showAllCompleted || i.getDueBy().isAfter(ld))
                .toList();
        return result;
    }
}
