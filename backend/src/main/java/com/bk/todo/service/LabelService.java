package com.bk.todo.service;

import com.bk.todo.entities.repo.LabelRepository;
import com.bk.todo.model.Label;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class LabelService {

    private final LabelRepository repo;


    public Label save(Label label) {
        if (Objects.isNull(label)) {
            log.warn("Null reference passed to persist");
            return null;
        }
        if (Objects.nonNull(label.getId())) {
            try {
                com.bk.todo.entities.Label entity = repo.getReferenceById(label.getId());
                entity.setName(label.getValue());
                return label;
            } catch(Exception e) {
                log.error("persisting failed.",e);
                return null;
            }
        } else {
            var newEntity = new com.bk.todo.entities.Label();
            newEntity.setName(label.getValue());
            repo.save(newEntity);
            return new Label(newEntity.getId(), newEntity.getName());
        }
    }

    public List<Label> list() {
       List<com.bk.todo.entities.Label> list =  repo.findAll();
       if (CollectionUtils.isEmpty(list)) {
           return List.of();
       }
       return list.stream().map(l -> new Label(l.getId(), l.getName())).toList();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<com.bk.todo.entities.Label> findAllById(List<Long> ids) {
        return repo.findAllById(ids);
    }
}
