package com.bk.todo.web;

import com.bk.todo.model.Label;
import com.bk.todo.service.LabelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("labels")
@RequiredArgsConstructor
@Slf4j
public class LabelController {

    private final LabelService service;

    @GetMapping
    public List<Label> labels() {
      var labelList = service.list();
      log.info("retrieved {} labels", Objects.isNull(labelList) ? 0 : labelList.size());
      return labelList;
    }

    @PostMapping("/new")
    public Label saveLabel(@RequestBody Label label) {
        log.info("Saving label: {}", label);
        return service.save(label);

    }

    @PostMapping("/delete")
    public void deleteLabel(@RequestBody Label label) {
        if (Objects.isNull(label)) {
            return;
        }
        log.info("deleting label: {}", label);
        service.delete(label.getId());
        log.info("label deleted from database");
    }
}
