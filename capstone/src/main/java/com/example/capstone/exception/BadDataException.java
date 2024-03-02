package com.example.capstone.exception;

public class BadDataException extends RuntimeException {

    public BadDataException() {
    }

    public BadDataException(String arg0) {
        super(arg0);
    }

    public BadDataException(Throwable arg0) {
        super(arg0);
    }

    public BadDataException(String arg0, Throwable arg1) {
        super(arg0, arg1);
    }

    public BadDataException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
        super(arg0, arg1, arg2, arg3);
    }
    
}
