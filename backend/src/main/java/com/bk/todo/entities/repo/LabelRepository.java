package com.bk.todo.entities.repo;

import com.bk.todo.entities.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends JpaRepository<Label,Long>, RevisionRepository<Label, Long, Long> {
}
