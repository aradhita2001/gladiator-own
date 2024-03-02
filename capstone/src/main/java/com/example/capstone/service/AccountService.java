package com.example.capstone.service;

import java.util.List;

import com.example.capstone.dto.AccountDetails;
import com.example.capstone.dto.AccountRequestDto;
import com.example.capstone.dto.NewAccountRequest;
import com.example.capstone.entity.Account;

public interface AccountService {
    List<Account> getAllAccounts();
    AccountDetails getAccountById(long accountId);
    long addAccountRequest(NewAccountRequest newAccountRequest);
    List<AccountRequestDto> getAllAccountRequests();
    void approveAccountRequest(long accountRequestId);
    void declineAccountRequest(long accountRequestId);
    void updateAccount(Account accounts);
    void deleteAccount(long accountId);
    List<Account> getAccountsByUser(long userId);
}
