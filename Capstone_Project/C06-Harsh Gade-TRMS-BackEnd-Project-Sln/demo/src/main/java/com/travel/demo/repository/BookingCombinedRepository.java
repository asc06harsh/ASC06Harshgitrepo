package com.travel.demo.repository;

import com.travel.demo.entity.BookingCombined;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingCombinedRepository extends JpaRepository<BookingCombined, String> {
}
