package com.example.capstone.dto;

import java.time.LocalDateTime;

import com.example.capstone.entity.Transaction;

public class TransactionForAccount {
    
    private long anotherAccountNumber;
    private String anotherUserName;
    private String transactionType;
    private double amount;
    private LocalDateTime transactionDate;

    public TransactionForAccount(Long accountId, Transaction transaction){
        
        if(transaction.getDestinationAccountId() == accountId){
            transactionType = "Credit";
            anotherAccountNumber = transaction.getSourceAccountId();
        }

        if(transaction.getSourceAccountId() == accountId){
            transactionType = "Debit";
            anotherAccountNumber = transaction.getDestinationAccountId();
        }

        amount = transaction.getAmount();
        transactionDate = transaction.getTransactionDate();
    }

    public long getAnotherAccountNumber() {
        return anotherAccountNumber;
    }

    public void setAnotherAccountNumber(long anotherAccountNumber) {
        this.anotherAccountNumber = anotherAccountNumber;
    }

    public String getAnotherUserName() {
        return anotherUserName;
    }

    public void setAnotherUserName(String anotherUserName) {
        this.anotherUserName = anotherUserName;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }
}
