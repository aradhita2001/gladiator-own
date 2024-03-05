package com.example.capstone.exception;

public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException() {
    }

    public UserAlreadyExistsException(String arg0) {
        super(arg0);
    }
}
