package com.bk.todo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "todo")
public class TodoItem {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "todo_id")
    private TodoList todo;

    private String description;

    private boolean isCompleted;

}