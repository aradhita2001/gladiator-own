package com.example.capstone.service;

import java.util.List;

import com.example.capstone.dto.TransactionForAccount;
import com.example.capstone.dto.TransactionForUser;
import com.example.capstone.entity.Transaction;

public interface TransactionService {
    List<Transaction> getAllTransactions();
    long addTransaction(Transaction transaction);
    List<TransactionForAccount> getDebitTransactionsByAccountId(long accountId);
    List<TransactionForAccount> getCreditTransactionsByAccountId(long accountId);
    List<TransactionForAccount> getAllTransactionsByAccountId(long accountId);
    List<TransactionForUser> getAllTransactionsByUserId(long userId);
}
