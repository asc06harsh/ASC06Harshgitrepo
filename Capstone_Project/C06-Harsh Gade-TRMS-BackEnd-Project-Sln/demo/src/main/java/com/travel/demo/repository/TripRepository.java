package com.travel.demo.repository;

import com.travel.demo.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import org.springframework.data.jpa.repository.Query;


import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, String> {

    @Query("SELECT t.id FROM Trip t ORDER BY t.id DESC LIMIT 1")
    Optional<String> findLastGeneratedId();
}

