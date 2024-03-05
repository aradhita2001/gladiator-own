package com.example.capstone.controller;

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

import com.example.capstone.dto.AccountDetails;
import com.example.capstone.dto.AccountRequestDto;
import com.example.capstone.dto.NewAccountRequest;
import com.example.capstone.entity.Account;
import com.example.capstone.exception.SecurityException;
import com.example.capstone.jwt.JwtUtil;
import com.example.capstone.service.AccountService;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/accounts") //default routing path for accounts
public class AccountController {
 
    private final AccountService accountService;
    private JwtUtil jwtUtil;
 
    @Autowired
    public AccountController(AccountService accountService, JwtUtil jwtUtil) {
        this.accountService = accountService;
        this.jwtUtil = jwtUtil;
    }
 
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }
 
    @GetMapping("/{accountId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<AccountDetails> getAccountById(@PathVariable long accountId, 
                            @RequestHeader (name="Authorization") String token) {
        
        if(!(jwtUtil.validateAdmin(token) || jwtUtil.validateUserByAccountId(token, accountId))) throw new SecurityException();

        AccountDetails accountDetails = accountService.getAccountById(accountId);
        if (accountDetails != null) {
            return new ResponseEntity<>(accountDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
   
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<List<Account>> getAccountsByUser(@PathVariable long userId,
                    @RequestHeader (name="Authorization") String token) {
        if(!(jwtUtil.validateAdmin(token) || jwtUtil.validateUser(token, userId))) throw new SecurityException();

        List<Account> accounts = accountService.getAccountsByUser(userId);
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }
 
    // @PostMapping
    // @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    // public ResponseEntity<Long> addAccount(@RequestBody Account accounts) {
    //     long accountId = accountService.addAccount(accounts);
    //     return new ResponseEntity<>(accountId, HttpStatus.CREATED);
    // }

    @PostMapping("/account-request")
    public ResponseEntity<Long> addAccountRequest(@RequestBody NewAccountRequest newAccountRequest){
        System.out.println(newAccountRequest.getUserId());
        return new ResponseEntity<Long>(accountService.addAccountRequest(newAccountRequest), HttpStatus.CREATED);
    }

    @GetMapping("/account-request")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<AccountRequestDto>> getAllAccountRequest(){
        return new ResponseEntity<List<AccountRequestDto>>(accountService.getAllAccountRequests(), HttpStatus.OK);
    }

    @GetMapping("/account-request/user/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<AccountRequestDto>> getAccountRequestsByUser(@PathVariable Long userId, 
                        @RequestHeader (name="Authorization") String token) {
        jwtUtil.validateUser(token, userId);
        return new ResponseEntity<List<AccountRequestDto>>(accountService.getAccountRequestsByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/account-request/requested")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<AccountRequestDto>> getAllRequestedAccountRequest(){
        return new ResponseEntity<List<AccountRequestDto>>(accountService.getAllRequestedAccountRequests(), HttpStatus.OK);
    }

    @GetMapping("/account-request/requested/user/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<AccountRequestDto>> getRequestedAccountRequestsByUser(@PathVariable Long userId, 
                    @RequestHeader (name="Authorization") String token) {
        jwtUtil.validateUser(token, userId);
        return new ResponseEntity<List<AccountRequestDto>>(accountService.getRequestedAccountRequestsByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/account-request/approved")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<AccountRequestDto>> getAllApprovedAccountRequest(){
        return new ResponseEntity<List<AccountRequestDto>>(accountService.getAllApprovedAccountRequests(), HttpStatus.OK);
    }

    @GetMapping("/account-request/approved/user/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<AccountRequestDto>> getApprovedAccountRequestsByUser(@PathVariable Long userId, 
                            @RequestHeader (name="Authorization") String token) {
        jwtUtil.validateUser(token, userId);
        return new ResponseEntity<List<AccountRequestDto>>(accountService.getApprovedAccountRequestsByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/account-request/declined")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<AccountRequestDto>> getAllDeclinedAccountRequest(){
        return new ResponseEntity<List<AccountRequestDto>>(accountService.getAllDeclinedAccountRequests(), HttpStatus.OK);
    }

    @GetMapping("/account-request/declined/user/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<AccountRequestDto>> getDeclinedAccountRequestsByUser(@PathVariable Long userId, 
                         @RequestHeader (name="Authorization") String token) {
        jwtUtil.validateUser(token, userId);
        return new ResponseEntity<List<AccountRequestDto>>(accountService.getDeclinedAccountRequestsByUser(userId), HttpStatus.OK);
    }
    

    @PutMapping("/account-request/approve/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity approveAccountRequest(@PathVariable Long id) {
        accountService.approveAccountRequest(id);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PutMapping("/account-request/decline/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity declineAccountRequest(@PathVariable Long id) {
        accountService.declineAccountRequest(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    

 
    // @PutMapping("/{accountId}")
    // @PreAuthorize("hasAuthority('USER')")
    // public ResponseEntity<Void> updateAccount(@PathVariable long accountId, @RequestBody Account accounts) {
    //     accounts.setAccountId(accountId);
    //     accountService.updateAccount(accounts);
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }
 
    // @DeleteMapping("/{accountId}")
    // @PreAuthorize("hasAuthority('ADMIN')")
    // public ResponseEntity<Void> deleteAccount(@PathVariable long accountId) {
    //     accountService.deleteAccount(accountId);
    //     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // }
}