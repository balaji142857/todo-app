package com.bk.todo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "todos")
public class Label {

    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String name;
    @ManyToMany
    @JoinTable(name = "todo_label_mapping",
            joinColumns = @JoinColumn(name="label_id"),
            inverseJoinColumns = @JoinColumn(name="todo_id"))
    private List<TodoList> todos;
}
