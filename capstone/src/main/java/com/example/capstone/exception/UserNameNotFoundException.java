package com.example.capstone.exception;

public class UserNameNotFoundException extends RuntimeException{

    public UserNameNotFoundException() {
    }

    public UserNameNotFoundException(String arg0) {
        super(arg0);
    }

    public UserNameNotFoundException(Throwable arg0) {
        super(arg0);
    }

    public UserNameNotFoundException(String arg0, Throwable arg1) {
        super(arg0, arg1);
    }

    public UserNameNotFoundException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
        super(arg0, arg1, arg2, arg3);
    }
    
}
