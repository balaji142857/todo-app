package com.bk.todo;

import com.bk.todo.entities.TodoItem;
import com.bk.todo.entities.TodoList;
import com.bk.todo.model.Priority;
import com.bk.todo.model.Status;
import com.bk.todo.service.TodoService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.envers.repository.config.EnableEnversRepositories;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
@EnableEnversRepositories
@EnableJpaRepositories(repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
@EnableTransactionManagement
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
				.due(LocalDate.now())
				.status(status)
				.title("something")
//				.labels(List.of(Label.builder().name(label1).build(),
//						Label.builder().name(label2).build()))
				.build();
		log.info("todo instance constructed, attempting to save {}", todo);
		var savedInstance =repo.save(todo);
		log.info("todo instance saved successfully {}", todo);
		todo.setItems(List.of(TodoItem.builder().todo(savedInstance).description("some completed item").itemOrder(1).isCompleted(true).build(),
				TodoItem.builder().todo(savedInstance).description("some incomplete item").itemOrder(2).isCompleted(false).build()));
		repo.save(todo);
		log.info("todo instance saved successfully for second time) {}", todo);
		var dbOptional = repo.get(todo.getId());
		log.info("db value is {}", dbOptional);
		return dbOptional;
	}

}
