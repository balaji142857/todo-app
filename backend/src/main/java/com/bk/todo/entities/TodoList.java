package com.bk.todo.entities;

import com.bk.todo.model.Priority;
import com.bk.todo.model.Status;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Table
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoList {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private LocalDateTime due;
    private Priority priority;
    private Status status;
    @CreatedDate
    private Date createdTime;
    @LastModifiedDate
    private Date lastModifiedTime;
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "todo_label_mapping",
            joinColumns = @JoinColumn(name="todo_id"),
            inverseJoinColumns = @JoinColumn(name="label_id"))
    @Builder.Default
    private List<Label> labels = new ArrayList<>();
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "todo", cascade = CascadeType.ALL)
    @Builder.Default
    private List<TodoItem> items = new java.util.ArrayList<>();
}
