package com.bk.todo.web;

import com.bk.todo.model.Label;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("labels")
public class LabelController {

    @GetMapping
    public List<Label> labels() {
        return List.of(
                new Label(1L, "app1"),
                new Label(2L, "app2"),
                new Label(3L, "personal"),
                new Label(4L, "work")
        );
    }
}
