package com.bk.todo.entities;

import com.bk.todo.model.Priority;
import com.bk.todo.model.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RevisionNumber;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Table
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Audited
public class TodoList {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private LocalDate due;// TODO consider adding time part
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
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "todo", cascade = CascadeType.ALL,orphanRemoval = true)
    @Builder.Default
    private List<TodoItem> items = new java.util.ArrayList<>();
    @RevisionNumber
    private Long revNum;
}
