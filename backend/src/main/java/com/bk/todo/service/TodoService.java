package com.bk.todo.service;

import com.bk.todo.entities.TodoList;
import com.bk.todo.entities.repo.TodoRepository;
import com.bk.todo.model.Status;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.data.history.Revisions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository repo;

    public TodoList save(TodoList item) {
        return repo.save(item);
    }

    public void delete(Long id) {
        repo.deleteById(id);
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


    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW)
    public Revisions<Long, TodoList> getHistory(Long id) {
        return repo.findRevisions(id);
    }


    @Transactional(readOnly = true)
    public List<TodoList> findOpenLists() {
        Set<Status> openStatus = Set.of(Status.IN_PROGRESS, Status.ON_HOLD, Status.TBD);
        return repo.findByStatusIn(openStatus);
    }
}
