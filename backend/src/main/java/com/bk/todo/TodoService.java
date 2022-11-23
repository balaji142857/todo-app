package com.bk.todo;

import com.bk.todo.entities.TodoList;
import com.bk.todo.entities.repo.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository repo;

    public TodoList save(TodoList item) {
        return repo.save(item);
    }

    @Transactional(readOnly = true)
    public TodoList get(Long id) {
        var optional = repo.findById(id);
        //TODO
        optional.ifPresentOrElse(val -> Hibernate.initialize(val.getLabels()), () -> {});
        return optional.orElse(null);
    }

    @Transactional(readOnly = true)
    public List<TodoList> findAll() {
        return repo.findAll();
    }
}
