
package com.example.capstone.service;
 
import java.util.ArrayList;
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.capstone.dto.TransactionForAccount;
import com.example.capstone.dto.TransactionForUser;
import com.example.capstone.entity.Account;
import com.example.capstone.entity.Transaction;
import com.example.capstone.entity.User;
import com.example.capstone.exception.AccountNotFoundException;
import com.example.capstone.repository.AccountRepository;
import com.example.capstone.repository.TransactionRepository;
import com.example.capstone.repository.UserRepository;
 
@Service
public class TransactionServiceImpl implements TransactionService {
    private TransactionRepository transactionRepository;
    private AccountRepository accountRepository;
    private UserRepository userRepository;
 
    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository, AccountRepository accountRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }
 
    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
 
    @Override
    public Transaction getTransactionById(long transactionId) {
        return transactionRepository.findById(transactionId).orElse(null);
    }
 
    @Override
    public long addTransaction(Transaction transaction) {
        Account srcAccount = accountRepository.findByAccountId(transaction.getSourceAccountId());
        Account desAccount = accountRepository.findByAccountId(transaction.getDestinationAccountId());
        if (srcAccount == null || desAccount == null) {
            throw new AccountNotFoundException("AccountId " + transaction.getDestinationAccountId() + " not found");
        }
        srcAccount.debit(transaction.getAmount());
        desAccount.credit(transaction.getAmount());
 
        accountRepository.save(srcAccount);
        accountRepository.save(desAccount);
        return transactionRepository.save(transaction).getTransactionId();
    }
 
    @Override
    public List<Transaction> getAllDebitTransactionsByAccountId(long accountId) {
 
        return transactionRepository.findBySourceAccountId(accountId);
    }
 
    @Override
    public List<Transaction> getAllCreditTransactionsByAccountId(long accountId) {
        return transactionRepository.findByDestinationAccountId(accountId);
    }

    @Override
    public List<TransactionForAccount> getAllTransactionsByAccountId(long accountId) {
        List<Transaction> transactions = transactionRepository.findByAccountId(accountId);

        List<TransactionForAccount> transactionForAccounts = new ArrayList<TransactionForAccount>();
        for(Transaction t : transactions){
            TransactionForAccount transactionForAccount = new TransactionForAccount(accountId, t);
            
            //get name of the another customer
            transactionForAccount.setAnotherUserName(
                accountRepository.findByAccountId(
                    transactionForAccount.getAnotherAccountNumber())
                    .getCustomer().getName());
            transactionForAccounts.add(transactionForAccount);
        }

        return transactionForAccounts;
    }

    @Override
    public List<TransactionForUser> getAllTransactionsByUserId(long userId) {
        List<Account> accounts = accountRepository.getAccountsByCustomerUserId(userId);
        User user = userRepository.findByUserId(userId);
        String userName = user.getName();
        List<TransactionForUser> transactionForUsers = new ArrayList<TransactionForUser>();

        for(Account account: accounts){
            List<Transaction> transactions = transactionRepository.findByAccountId(account.getAccountId());
            for(Transaction transaction : transactions){
                transactionForUsers.add(new TransactionForUser(transaction, userName));
            }
        }
        return transactionForUsers;
    }
 
}
 