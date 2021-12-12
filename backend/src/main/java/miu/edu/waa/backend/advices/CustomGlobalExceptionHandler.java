package miu.edu.waa.backend.advices;

import miu.edu.waa.backend.dto.ErrorResponseDTO;
import miu.edu.waa.backend.exception.CustomException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@ControllerAdvice
public class CustomGlobalExceptionHandler {

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


        ErrorResponseDTO error = new ErrorResponseDTO();
        error.setError(new LinkedHashMap<>(){{
            put("timestamp", new Date());
            put("error", errors);
        }});

        return new ResponseEntity<>(error, headers, status);
    }

    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(javax.validation.ConstraintViolationException.class)
    public ResponseEntity<Object> onConstraintValidationException(javax.validation.ConstraintViolationException e) {
        ErrorResponseDTO error = new ErrorResponseDTO();
        error.setError(new LinkedHashMap<>(){{
            put("timestamp", new Date());
            put("error", new ArrayList<>(e.getConstraintViolations()));
        }});
        return new ResponseEntity<>(error, HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> hibernateViolationConstraint(ConstraintViolationException e) {
        return new ResponseEntity<>(
                returnedErrorObject(e),
                HttpStatus.BAD_REQUEST
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CustomException.class)
    ResponseEntity<ErrorResponseDTO> customExceptionHandler(CustomException e) {
        return new ResponseEntity<>(
                returnedErrorObject(e),
                HttpStatus.BAD_REQUEST
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponseDTO> missingBody(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>(
                returnedErrorObject(ex),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> userNotFoundHandler(Exception ex) {
        return new ResponseEntity<>(
                returnedErrorObject(ex),
                HttpStatus.BAD_REQUEST
        );
    }

    private ErrorResponseDTO returnedErrorObject(Exception ex) {
        ErrorResponseDTO error = new ErrorResponseDTO();
        error.setError(new LinkedHashMap<>(){{
            put("timestamp", new Date());
            put("message", ex.getMessage());
        }});
        return error;
    }
}
