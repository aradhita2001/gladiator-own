package com.example.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.capstone.entity.Loan;
import com.example.capstone.service.LoanService;

import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.getAllLoans();
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
        Loan loan = loanService.getLoanById(id);
        if (loan != null) {
            return new ResponseEntity<>(loan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/user/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Loan>> getLoanByUserId(@PathVariable Long id) {
        List<Loan> loans = loanService.getLoanByUserId(id);
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Loan> createLoan(@RequestBody Loan loan) {
        Loan createdLoan = loanService.createLoan(loan);
        return new ResponseEntity<>(createdLoan, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        Loan existingLoan = loanService.getLoanById(id);
        if (existingLoan != null) {
            loanService.deleteLoan(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/emi/{id}")
    public double calculateEMI(@PathVariable Long id) {
        ResponseEntity<Loan> loan = getLoanById(id);
        double emi = loanService.calculateEMI(loan.getBody());
        return emi;
    }

    @PostMapping("/openemi")
    public double calculateOpenEMI(@RequestBody Loan loan) {
        // ResponseEntity<Loan> loan = getLoanById(id);
        double emi = loanService.calculateEMI(loan);
        return emi;
    }
}