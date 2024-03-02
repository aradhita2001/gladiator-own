package com.example.capstone.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.capstone.dto.TransactionForAccount;
import com.example.capstone.dto.TransactionForUser;
import com.example.capstone.entity.Transaction;
import com.example.capstone.service.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
 
    private final TransactionService transactionService;
 
    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }
 
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
 
    @GetMapping("/{transactionId}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable long transactionId) {
        Transaction transaction = transactionService.getTransactionById(transactionId);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
 
    @PostMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<Long> addTransaction(@RequestBody Transaction transaction) {
        long transactionId = transactionService.addTransaction(transaction);
        return new ResponseEntity<>(transactionId, HttpStatus.CREATED);
    }

    // @GetMapping("/user/{userId}")
    // public ResponseEntity<List<TransactionForUser>> getAllTransactionsByCustomerId(@PathVariable long customerId) {
    //     List<TransactionForUser> transactions = transactionService.getAllTransactionsByUserId(customerId);
    //     return new ResponseEntity<>(transactions, HttpStatus.OK);
    // }

    @GetMapping("/account/debit/{accountId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Transaction>> getAllDebitTransactionsByAccountId(@PathVariable long accountId) {
        List<Transaction> transactions = transactionService.getAllDebitTransactionsByAccountId(accountId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/account/credit/{accountId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Transaction>> getAllCreditTransactionsByAccountId(@PathVariable long accountId) {
        List<Transaction> transactions = transactionService.getAllCreditTransactionsByAccountId(accountId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<TransactionForAccount>> getAllTransactionByAccountId(@PathVariable long accountId){
        return new ResponseEntity<List<TransactionForAccount>>(transactionService.getAllTransactionsByAccountId(accountId) ,HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionForUser>> getAllTransactionByUserId(@PathVariable long userId){
        return new ResponseEntity<List<TransactionForUser>>(transactionService.getAllTransactionsByUserId(userId) ,HttpStatus.OK);
    }
}
