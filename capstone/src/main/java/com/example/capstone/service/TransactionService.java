package com.example.capstone.service;

import java.util.List;

import com.example.capstone.dto.TransactionForAccount;
import com.example.capstone.dto.TransactionForUser;
import com.example.capstone.entity.Transaction;

public interface TransactionService {
    List<Transaction> getAllTransactions();
    Transaction getTransactionById(long transactionId);
    long addTransaction(Transaction transaction);
    // List<Transaction> getTransactionsByCustomerId(int customerId) throws SQLException;
    List<Transaction> getAllCreditTransactionsByAccountId(long accountId);
    List<Transaction> getAllDebitTransactionsByAccountId(long accountId);
    List<TransactionForAccount> getAllTransactionsByAccountId(long accountId);
    List<TransactionForUser> getAllTransactionsByUserId(long userId);
}
