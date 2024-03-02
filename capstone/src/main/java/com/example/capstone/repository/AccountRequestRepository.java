package com.example.capstone.repository;

import org.springframework.stereotype.Repository;

import com.example.capstone.entity.AccountRequest;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AccountRequestRepository extends JpaRepository<AccountRequest, Long> {

}
