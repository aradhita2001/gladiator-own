package com.example.capstone.dto;

import com.example.capstone.entity.AccountRequest;

public class AccountRequestDto {
    private long accountRequestId;
    private String username;
    private String email;
    private double balance;
    private String accountType;
    private String status;

    public AccountRequestDto(AccountRequest accountRequest) {
        accountRequestId = accountRequest.getAccountRequestId();
        username = accountRequest.getCustomer().getName();
        email = accountRequest.getCustomer().getEmail();
        balance = accountRequest.getBalance();
        accountType = accountRequest.getAccountType();
        status = accountRequest.getStatus();
    }

    public long getAccountRequestId() {
        return accountRequestId;
    }

    public void setAccountRequestId(long accountRequestId) {
        this.accountRequestId = accountRequestId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
