package com.bk.todo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.envers.Audited;

@Entity
@Table
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "todo")
@Audited
public class TodoItem {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "todo_id")
    @JsonIgnore
    private TodoList todo;

    private String description;

    private boolean isCompleted;

    private Integer itemOrder;

}