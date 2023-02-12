package com.bk.todo.service;

import com.bk.todo.entities.TodoList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final TodoService service;
    public List<TodoList> test() {
        var openLists = service.findOpenLists();
        if (CollectionUtils.isEmpty(openLists)) {
            return List.of();
        }
        // TODO

        return openLists;
    }

}
