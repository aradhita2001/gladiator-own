package com.example.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.capstone.dto.AccountDetails;
import com.example.capstone.dto.AccountRequestDto;
import com.example.capstone.dto.NewAccountRequest;
import com.example.capstone.entity.Account;
import com.example.capstone.entity.AccountRequest;
import com.example.capstone.entity.User;
import com.example.capstone.exception.AccountNotFoundException;
import com.example.capstone.exception.BadDataException;
import com.example.capstone.repository.AccountRepository;
import com.example.capstone.repository.AccountRequestRepository;
import com.example.capstone.repository.UserRepository;

@Service
public class AccountServiceImpl implements AccountService {

    private UserRepository userRepository;
    private AccountRepository accountRepository;
    private AccountRequestRepository accountRequestRepository;

    @Autowired
    public AccountServiceImpl(UserRepository userRepository, AccountRepository accountRepository, AccountRequestRepository accountRequestRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.accountRequestRepository = accountRequestRepository;
    }

    private long addAccount(Account accounts) {
        return accountRepository.save(accounts).getAccountId();
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public List<Account> getAccountsByUser(long customerId) {
        return accountRepository.getAccountsByCustomerUserId(customerId);
    }

    @Override
    public AccountDetails getAccountById(long accountId) {
        Optional<Account> account = accountRepository.findById(accountId);

        if (account.isPresent()) {
            AccountDetails accountDetails = new AccountDetails(account.get());
            return accountDetails;
        }

        throw new AccountNotFoundException("No accounts found linked with this accountId");
    }

    

    @Override
    public void updateAccount(Account accounts) {
        Account account = accountRepository.findByAccountId(accounts.getAccountId());
        account.setAccountType(accounts.getAccountType());
        account.setBalance(accounts.getBalance());
        accountRepository.save(account);
    }

    @Override
    public void deleteAccount(long accountId) {
        accountRepository.deleteById(accountId);
    }

    @Override
    public long addAccountRequest(NewAccountRequest newAccountRequest) {
        User user = userRepository.findById(newAccountRequest.getUserId()).orElseThrow(BadDataException::new);

        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setAccountType(newAccountRequest.getAccountType());
        accountRequest.setBalance(newAccountRequest.getBalance());
        accountRequest.setCustomer(user);

        return accountRequestRepository.save(accountRequest).getAccountRequestId();
    }

    @Override
    public List<AccountRequestDto> getAllAccountRequests() {
        return accountRequestRepository.findAll().stream().map(AccountRequestDto::new).toList();
    }

    @Override
    public void approveAccountRequest(long accountRequestId) {
        AccountRequest accountRequest = accountRequestRepository.findById(accountRequestId).orElseThrow(BadDataException::new);
        accountRequest.approve();
        Account account = new Account(accountRequest.getCustomer(), accountRequest.getAccountType(), accountRequest.getBalance());
        accountRepository.save(account);
        accountRequestRepository.save(accountRequest);
    }

    @Override
    public void declineAccountRequest(long accountRequestId) {
        AccountRequest accountRequest = accountRequestRepository.findById(accountRequestId).orElseThrow(BadDataException::new);
        accountRequest.decline();
        accountRequestRepository.save(accountRequest);
    }
}
