package com.bk.todo;

import com.bk.todo.entities.Label;
import com.bk.todo.entities.TodoItem;
import com.bk.todo.entities.TodoList;
import com.bk.todo.model.Priority;
import com.bk.todo.model.Status;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
@Slf4j
public class TodoApplication {

	@Autowired
	TodoService repo;

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@PostConstruct
	public void test() {
		createTodo(Priority.CRITICAL, Status.IN_PROGRESS, "app1","app2");
		createTodo(Priority.HIGH, Status.COMPLETED, "app1","app2");
		createTodo(Priority.MEDIUM, Status.TBD, "app1","app2");
		createTodo(Priority.LOW, Status.ON_HOLD, "app1","app2");
	}

	public TodoList createTodo(Priority priority, Status status, String label1, String label2) {
		TodoList todo = null;
		todo = TodoList.builder()
				.priority(priority)
				.description("dasf")
				.due(LocalDateTime.now())
				.status(status)
				.title("something")
//				.labels(List.of(Label.builder().name(label1).build(),
//						Label.builder().name(label2).build()))
				.build();
		log.info("todo instance constructed, attempting to save {}", todo);
		var savedInstance =repo.save(todo);
		log.info("todo instance saved successfully {}", todo);
		todo.setItems(List.of(TodoItem.builder().todo(savedInstance).description("some completed item").isCompleted(true).build(),
				TodoItem.builder().todo(savedInstance).description("some incomplete item").isCompleted(false).build()));
		repo.save(todo);
		log.info("todo instance saved successfully for second time) {}", todo);
		var dbOptional = repo.get(todo.getId());
		log.info("db value is {}", dbOptional);
		return dbOptional;
	}

}
