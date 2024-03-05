package com.example.capstone.service;

import java.util.List;

import com.example.capstone.entity.Loan;

public interface LoanService {
    List<Loan> getAllLoans();
    Loan getLoanById(long id);
    List<Loan> getLoanByUserId(long userId);
    Loan createLoan(Loan loan);
    void deleteLoan(long id);
    double calculateEMI(Loan loan);
}
