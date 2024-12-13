package com.travel.demo.service;

import com.travel.demo.entity.BookingCombined;
import com.travel.demo.repository.BookingCombinedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingCombinedService {

    @Autowired
    private BookingCombinedRepository bookingCombinedRepository;

    public List<BookingCombined> getAllBookings() {
        return bookingCombinedRepository.findAll();
    }

    public Optional<BookingCombined> getBookingById(String id) {
        return bookingCombinedRepository.findById(id);
    }

    public BookingCombined createBooking(BookingCombined booking) {
        String newId = generateNewId();  // Generate ID before saving
        booking.setId(newId);
        return bookingCombinedRepository.save(booking);
    }

    public BookingCombined updateBooking(String id, BookingCombined booking) {
        if (bookingCombinedRepository.existsById(id)) {
            booking.setId(id);  // Ensure the ID is preserved
            return bookingCombinedRepository.save(booking);
        }
        return null;
    }

    public boolean deleteBooking(String id) {
        if (bookingCombinedRepository.existsById(id)) {
            bookingCombinedRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Helper Method to Generate ID
    private String generateNewId() {
        List<BookingCombined> bookings = bookingCombinedRepository.findAll();
        int maxId = bookings.stream()
                .mapToInt(b -> Integer.parseInt(b.getId().substring(1)))
                .max()
                .orElse(0);
        return String.format("B%04d", maxId + 1);  // Format as "B0001"
    }
}
