package com.example.capstone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.capstone.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>{
    List<Transaction> findBySourceAccountId(long accountId);
    List<Transaction> findByDestinationAccountId(long accountId);

    @Query("select t from Transaction t where t.sourceAccountId = :accountId or t.destinationAccountId = :accountId")
    List<Transaction> findByAccountId(long accountId);
}
