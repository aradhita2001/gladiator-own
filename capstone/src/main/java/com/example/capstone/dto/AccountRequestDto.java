package com.example.capstone.dto;

import com.example.capstone.entity.AccountRequest;

public class AccountRequestDto {
    private long accountRequestId;
    private String username;
    private String email;
    private double  balance;
    private String accountType;
    private String status;

    public AccountRequestDto(AccountRequest accountRequest){
        accountRequestId = accountRequest.getAccountRequestId();
        username = accountRequest.getCustomer().getName();
        email = accountRequest.getCustomer().getEmail();
        balance = accountRequest.getBalance();
        accountType = accountRequest.getAccountType();
        status = accountRequest.getStatus();
    }
}
