package com.bk.todo.web;

import com.bk.todo.model.Priority;
import com.bk.todo.model.Status;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/static/")
@CrossOrigin
public class StaticDataController {

   @GetMapping("priorities")
   public List<String> priorities() {
       return Arrays.stream(Priority.values()).map(Priority::name).toList();
   }

    @GetMapping("status")
    public List<String> status() {
        return Arrays.stream(Status.values()).map(Status::getValue).toList();
    }
}
