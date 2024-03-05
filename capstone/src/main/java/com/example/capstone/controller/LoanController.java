package com.example.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.capstone.entity.Loan;
import com.example.capstone.exception.AuthenticationFailureException;
import com.example.capstone.jwt.JwtUtil;
import com.example.capstone.service.LoanService;

import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.getAllLoans();
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }
    
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Loan>> getLoanByUserId(@PathVariable Long userId, 
                @RequestHeader (name="Authorization") String token) {
        if(!jwtUtil.validateUser(token, userId)) throw new AuthenticationFailureException();
        List<Loan> loans = loanService.getLoanByUserId(userId);
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Loan> createLoan(@RequestBody Loan loan, 
                    @RequestHeader (name="Authorization") String token) {
        if(!jwtUtil.validateUser(token, loan.getCustomer().getUserId())) throw new AuthenticationFailureException();
        Loan createdLoan = loanService.createLoan(loan);
        return new ResponseEntity<>(createdLoan, HttpStatus.CREATED);
    }

    @PostMapping("/openemi")
    public double calculateOpenEMI(@RequestBody Loan loan) {
        double emi = loanService.calculateEMI(loan);
        return emi;
    }
}