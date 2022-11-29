package com.bk.todo.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.envers.Audited;

import java.util.List;

@Table
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "todos")
@Audited
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
