package com.bk.todo.entities.repo;

import com.bk.todo.entities.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<TodoList,Long>, RevisionRepository<TodoList, Long, Long> {
}
