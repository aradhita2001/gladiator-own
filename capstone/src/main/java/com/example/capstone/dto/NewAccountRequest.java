package com.example.capstone.dto;

public class NewAccountRequest {

    private long userId;
    private String accountType;
    private double balance;

    public NewAccountRequest() {
    }

    public NewAccountRequest(long userId, String accountType, double balance) {
        this.userId = userId;
        this.accountType = accountType;
        this.balance = balance;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

}
