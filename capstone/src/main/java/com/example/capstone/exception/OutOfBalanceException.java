package com.example.capstone.exception;

public class OutOfBalanceException extends RuntimeException{

    public OutOfBalanceException() {
    }

    public OutOfBalanceException(String arg0) {
        super(arg0);
    }

    public OutOfBalanceException(Throwable arg0) {
        super(arg0);
    }

    public OutOfBalanceException(String arg0, Throwable arg1) {
        super(arg0, arg1);
    }

    public OutOfBalanceException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
        super(arg0, arg1, arg2, arg3);
    }
    
}
