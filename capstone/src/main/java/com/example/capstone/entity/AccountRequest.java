package com.example.capstone.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class AccountRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long accountRequestId;
    @ManyToOne
    // @JoinColumn(name = "customerId") // one customer can be mapped to many
    // accounts
    private User customer;
    private String accountType;
    private double balance;
    private String status;

    public AccountRequest() {
        this.status = "REQUESTED";
    }

    public AccountRequest(User customer, String accountType, double balance) {
        this();
        this.customer = customer;
        this.accountType = accountType;
        this.balance = balance;
    }

    public long getAccountRequestId() {
        return accountRequestId;
    }

    public void setAccountRequestId(long accountRequestId) {
        this.accountRequestId = accountRequestId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean approve(){
        if(this.status == "REQUESTED") {
            this.status = "APPROVED";
            return true;
        }

        return false;
    }

    public boolean decline(){
        if(this.status == "REQUESTED") {
            this.status = "DECLINED";
            return true;
        }

        return false;
    }
}
