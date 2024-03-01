package com.example.capstone.service;

import java.util.List;

import com.example.capstone.entity.Loan;

public interface LoanService {
    List<Loan> getAllLoans();

    Loan getLoanById(Long id);

    Loan createLoan(Loan loan);

    void deleteLoan(Long id);

    double calculateEMI(Loan loan);

}
