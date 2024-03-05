package com.example.capstone.repository;

import org.springframework.stereotype.Repository;

import com.example.capstone.entity.AccountRequest;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface AccountRequestRepository extends JpaRepository<AccountRequest, Long> {
    List<AccountRequest> getAccountRequestsByCustomerUserId(long userId);
    
    @Query("select a from AccountRequest a where a.customer.userId = :userId AND a.status = 'APPROVED'")
    List<AccountRequest> getApprovedAccountRequestsByCustomerUserId(long userId);
    
    @Query("select a from AccountRequest a where a.customer.userId = :userId AND a.status = 'DECLINED'")
    List<AccountRequest> getDeclinedAccountRequestsByCustomerUserId(long userId);
    
    @Query("select a from AccountRequest a where a.customer.userId = :userId AND a.status = 'REQUESTED'")
    List<AccountRequest> getRequestedAccountRequestsByCustomerUserId(long userId);

    @Query("select a from AccountRequest a where a.status = 'APPROVED'")
    List<AccountRequest> getApprovedAccountRequests();
    
    @Query("select a from AccountRequest a where a.status = 'DECLINED'")
    List<AccountRequest> getDeclinedAccountRequests();
    
    @Query("select a from AccountRequest a where a.status = 'REQUESTED'")
    List<AccountRequest> getRequestedAccountRequests();
}
