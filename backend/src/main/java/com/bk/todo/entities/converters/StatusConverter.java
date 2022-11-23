package com.bk.todo.entities.converters;

import com.bk.todo.model.Status;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<Status, String> {
    @Override
    public String convertToDatabaseColumn(Status attribute) {
        return null != attribute ? attribute.getValue() : null;
    }

    @Override
    public Status convertToEntityAttribute(String dbData) {
        if (null == dbData) {
            return null;
        }
        return Status.fromString(dbData);
    }
}
