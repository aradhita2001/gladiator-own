package com.example.capstone.exception;

public class AuthenticationFailureException extends RuntimeException{

    public AuthenticationFailureException() {
    }

    public AuthenticationFailureException(String arg0) {
        super(arg0);
    }
}
