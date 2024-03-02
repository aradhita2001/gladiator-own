package com.example.capstone.repository;

import org.springframework.stereotype.Repository;

import com.example.capstone.entity.Account;
import com.example.capstone.entity.AccountRequest;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AccountRequestRepository extends JpaRepository<AccountRequest, Long> {
    List<AccountRequest> getAccountRequestsByCustomerUserId(long userId);
    // List<AccountRequest> findbyCustomerUserId(long userId);

}
