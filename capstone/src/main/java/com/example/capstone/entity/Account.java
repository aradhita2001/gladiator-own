package com.example.capstone.entity;

import com.example.capstone.exception.OutOfBalanceException;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Account {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long accountId;
    @ManyToOne
    // @JoinColumn(name = "customerId") // one customer can be mapped to many
    // accounts
    private User customer;
    private String accountType;
    private double balance;
   
 
 
    public Account() {
    }
 
    public Account(User customer, String accountType, double balance) {
        this.customer = customer;
        this.accountType = accountType;
        this.balance = balance;
    }
 
    public long getAccountId() {
        return accountId;
    }
 
    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }
 
    public User getCustomer() {
        return customer;
    }
 
    public void setCustomer(User customer) {
        this.customer = customer;
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
 
    public void credit(double amount){
        this.balance = this.balance+amount;
    }
 
    public void debit(double amount){
        if(this.balance<amount){
            throw new OutOfBalanceException("Insufficient Balance");
        }
        this.balance = this.balance-amount;
    }
}



