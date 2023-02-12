package com.bk.todo.entities.repo;

import com.bk.todo.entities.TodoList;
import com.bk.todo.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TodoRepository extends JpaRepository<TodoList,Long>, RevisionRepository<TodoList, Long, Long> {

    List<TodoList> findByStatusIn(Set<Status> ststus);
}
