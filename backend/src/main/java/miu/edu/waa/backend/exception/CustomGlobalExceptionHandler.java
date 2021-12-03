package miu.edu.waa.backend.exception;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.context.support.DefaultMessageSourceResolvable;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;

@ControllerAdvice
public class CustomGlobalExceptionHandler  {

    // error handle for @Valid
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status) {

        // Get all errors
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        return new ResponseEntity<>(new LinkedHashMap<>(){{
            put("timestamp", new Date());
            put("status", status.value());
            put("errors", errors);
        }}, headers, status);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(javax.validation.ConstraintViolationException.class)
    ResponseEntity<Object> onConstraintValidationException(javax.validation.ConstraintViolationException e) {

        List<?> errors = new ArrayList<>(e.getConstraintViolations());

        return new ResponseEntity<>(new LinkedHashMap<>(){{
            put("timestamp", new Date());
            put("status",HttpStatus.BAD_REQUEST);
            put("errors", errors);
        }}, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    ResponseEntity<Object> hibernateViolationConstraint(ConstraintViolationException e) {
        return new ResponseEntity<>(new LinkedHashMap<>(){{
            put("timestamp", new Date());
            put("error", e.getMessage());
            put("status",HttpStatus.BAD_REQUEST);
        }}, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> missingBody(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
