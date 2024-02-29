package com.example.capstone.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.capstone.dto.AccountDetails;
import com.example.capstone.entity.Account;
import com.example.capstone.service.AccountService;

@RestController
@RequestMapping("/accounts") //default routing path for accounts
public class AccountController {
 
    private final AccountService accountService;
 
    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }
 
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }
 
    @GetMapping("/{accountId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<AccountDetails> getAccountById(@PathVariable long accountId) {
        AccountDetails accountDetails = accountService.getAccountById(accountId);
        if (accountDetails != null) {
            return new ResponseEntity<>(accountDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
   
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<List<Account>> getAccountsByUser(@PathVariable long userId) {
        List<Account> accounts = accountService.getAccountsByUser(userId);
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }
 
    @PostMapping
    public ResponseEntity<Long> addAccount(@RequestBody Account accounts) {
        long accountId = accountService.addAccount(accounts);
        return new ResponseEntity<>(accountId, HttpStatus.CREATED);
    }
 
    @PutMapping("/{accountId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Void> updateAccount(@PathVariable long accountId, @RequestBody Account accounts) {
        accounts.setAccountId(accountId);
        accountService.updateAccount(accounts);
        return new ResponseEntity<>(HttpStatus.OK);
    }
 
    @DeleteMapping("/{accountId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteAccount(@PathVariable long accountId) {
        accountService.deleteAccount(accountId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}