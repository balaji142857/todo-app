package com.bk.todo.entities.converters;

import com.bk.todo.model.Priority;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class PriorityConverter implements AttributeConverter<Priority, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Priority priority) {
        return priority == null ? null : priority.getCode();
    }

    @Override
    public Priority convertToEntityAttribute(Integer code) {
        if (code == null) {
            return null;
        }
        return Stream.of(Priority.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}