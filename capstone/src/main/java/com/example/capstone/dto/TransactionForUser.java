package com.example.capstone.dto;

import java.time.LocalDateTime;

import com.example.capstone.entity.Transaction;

public class TransactionForUser {

    private long sourceAccountId;
    private long destinationAccountId;
    private String destinationAccountHolderName;
    private double amount;
    private LocalDateTime timeStamp;

    public TransactionForUser(Transaction transaction, String destinationAccountHolderName){
        sourceAccountId = transaction.getSourceAccountId();
        destinationAccountId = transaction.getDestinationAccountId();
        this.destinationAccountHolderName = destinationAccountHolderName;
        amount = transaction.getAmount();
        
        timeStamp = transaction.getTransactionDate();
    }

    public long getSourceAccountId() {
        return sourceAccountId;
    }

    public void setSourceAccountId(long sourceAccountId) {
        this.sourceAccountId = sourceAccountId;
    }

    public long getDestinationAccountId() {
        return destinationAccountId;
    }

    public void setDestinationAccountId(long destinationaccountId) {
        this.destinationAccountId = destinationaccountId;
    }

    public String getDestinationAccountHolderName() {
        return destinationAccountHolderName;
    }

    public void setDestinationAccountHolderName(String destinationAccountHolderName) {
        this.destinationAccountHolderName = destinationAccountHolderName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    

}
