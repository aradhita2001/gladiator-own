package com.example.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.capstone.entity.Loan;
import com.example.capstone.repository.LoanRepository;

import java.util.List;

@Service
public class LoanServiceImpl implements LoanService {
 
    @Autowired
    private LoanRepository loanRepository;  
 
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }
 
    public Loan getLoanById(long id) {
        return loanRepository.findById(id).get();
    }

    public List<Loan> getLoanByUserId(long userId) {
        return loanRepository.findByCustomerUserId(userId);
    }
 
    public Loan createLoan(Loan loan) {
        return loanRepository.save(loan);
    }
 
    public void deleteLoan(long id) {
        loanRepository.deleteById(id);
    }
 
    public double calculateEMI(Loan loan){ //calculating emi monthly.
        double tenure;
        double rate;
        double emi;
        if(loan.getLoanType()=="Home Loan"){
            rate=9;
        }
        else if(loan.getLoanType()=="Education Loan"){
            rate=7;
        }
        else if(loan.getLoanType()=="Personal Loan"){
            rate=10;
        }
        else{
            rate=8.5;
        }        
        rate = rate / (12 * 100); // one month interest
        tenure = loan.getTenure() * 12; // one month period
        emi = (loan.getAmount() * rate * (float)Math.pow(1 + rate, tenure))
                / (float)(Math.pow(1 + rate, tenure) - 1);
        return emi;
    }
}