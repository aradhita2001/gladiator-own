package com.example.capstone.dto;

// import java.util.List;

import com.example.capstone.entity.Account;
// import com.example.capstone.entity.Transaction;

public class AccountDetails {
    private long id;
    private String userName;
    private double balance;
    private String accountType;
    // private List<Transaction> transactions;

    public AccountDetails(Account account){
        this.id = account.getAccountId();
        this.userName = account.getCustomer().getName();
        this.balance = account.getBalance();
        this.accountType = account.getAccountType();        
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    // public List<Transaction> getTransactions() {
    //     return transactions;
    // }

    // public void setTransactions(List<Transaction> transactions) {
    //     this.transactions = transactions;
    // }
}
