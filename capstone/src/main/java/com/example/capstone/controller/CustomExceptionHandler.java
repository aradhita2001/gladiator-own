package com.example.capstone.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.example.capstone.dto.ExceptionResponse;
import com.example.capstone.exception.AccountNotFoundException;
import com.example.capstone.exception.AuthenticationFailureException;
import com.example.capstone.exception.OutOfBalanceException;
import com.example.capstone.exception.UserNameNotFoundException;

@ControllerAdvice
@RestController
public class CustomExceptionHandler {
    
    // @ExceptionHandler(Exception.class)
    // public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
    //     ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage(), request.getDescription(false));
    //     return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    // }

    // @ExceptionHandler(AccountNotFoundException.class)
    // public ResponseEntity<Object> handleEmployeeNotFound(AccountNotFoundException ex, WebRequest request) {
    //     // ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage(), request.getDescription(false));
    //     // return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    //     return ResponseEntity.status(HttpStatus.NOT_FOUND)
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .body(new ExceptionResponse(ex.getMessage(), request.getDescription(false)));
    // }

    // @ExceptionHandler(AuthenticationFailureException.class)
    // public ResponseEntity<Object> handleEmployeeNotFound(AuthenticationFailureException ex, WebRequest request) {
    //     ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage(), request.getDescription(false));
    //     return new ResponseEntity<>(exceptionResponse, HttpStatus.FORBIDDEN);
    // }

    // @ExceptionHandler(OutOfBalanceException.class)
    // public ResponseEntity<Object> handleEmployeeNotFound(OutOfBalanceException ex, WebRequest request) {
    //     ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage(), request.getDescription(false));
    //     return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    // }

    // @ExceptionHandler(UserNameNotFoundException.class)
    // public ResponseEntity<Object> handleEmployeeNotFound(UserNameNotFoundException ex, WebRequest request) {
    //     ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage(), request.getDescription(false));
    //     return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    // }
}
