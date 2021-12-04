package miu.edu.waa.backend.helpers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.lang.reflect.Type;
import java.util.stream.Collectors;

@Component
public class ModelMapperUtil {

    private ModelMapper modelMapper;

    @Autowired // Autowired by the setter method
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public <T, R> R mapEntryTo(T entityFrom, R entityTo) {
        return modelMapper.map(entityFrom, (Type) entityTo.getClass());
    }

    public <T, R> List<R> mapEntriesToList(List<T> entries, R entityTo) {
        return entries.stream()
                .map(entry -> mapEntryTo(entry, entityTo))
                .collect(Collectors.toList());
    }
}
