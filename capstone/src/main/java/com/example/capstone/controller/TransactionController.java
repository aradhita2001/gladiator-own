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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.capstone.dto.TransactionForAccount;
import com.example.capstone.dto.TransactionForUser;
import com.example.capstone.entity.Transaction;
import com.example.capstone.jwt.JwtUtil;
import com.example.capstone.service.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private JwtUtil jwtUtil;

    @Autowired
    public TransactionController(TransactionService transactionService, JwtUtil jwtUtil) {
        this.transactionService = transactionService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Long> addTransaction(@RequestBody Transaction transaction,
            @RequestHeader(name = "Authorization") String token) {
        if (!(jwtUtil.validateUserByAccountId(token, transaction.getSourceAccountId())))
            throw new SecurityException();

        long transactionId = transactionService.addTransaction(transaction);
        return new ResponseEntity<>(transactionId, HttpStatus.CREATED);
    }

    @GetMapping("/account/{accountId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<List<TransactionForAccount>> getAllTransactionByAccountId(@PathVariable long accountId,
            @RequestHeader(name = "Authorization") String token) {
        if (!(jwtUtil.validateAdmin(token) || jwtUtil.validateUserByAccountId(token, accountId)))
            throw new SecurityException();
        return new ResponseEntity<List<TransactionForAccount>>(
                transactionService.getAllTransactionsByAccountId(accountId), HttpStatus.OK);
    }

    @GetMapping("/account/debit/{accountId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<List<TransactionForAccount>> getDebitTransactionByAccountId(@PathVariable long accountId,
            @RequestHeader(name = "Authorization") String token) {
        if (!(jwtUtil.validateAdmin(token) || jwtUtil.validateUserByAccountId(token, accountId)))
            throw new SecurityException();
        return new ResponseEntity<List<TransactionForAccount>>(
                transactionService.getDebitTransactionsByAccountId(accountId), HttpStatus.OK);
    }

    @GetMapping("/account/credit/{accountId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<List<TransactionForAccount>> getCreditTransactionByAccountId(@PathVariable long accountId,
            @RequestHeader(name = "Authorization") String token) {
        if (!(jwtUtil.validateAdmin(token) || jwtUtil.validateUserByAccountId(token, accountId)))
            throw new SecurityException();
        return new ResponseEntity<List<TransactionForAccount>>(
                transactionService.getCreditTransactionsByAccountId(accountId), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<List<TransactionForUser>> getAllTransactionByUserId(@PathVariable long userId,
            @RequestHeader(name = "Authorization") String token) {
        if (!(jwtUtil.validateAdmin(token) || jwtUtil.validateUser(token, userId)))
            throw new SecurityException();
        return new ResponseEntity<List<TransactionForUser>>(transactionService.getAllTransactionsByUserId(userId),
                HttpStatus.OK);
    }
}
