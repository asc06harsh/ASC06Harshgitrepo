package com.travel.demo.controller;

import com.travel.demo.entity.BookingCombined;
import com.travel.demo.service.BookingCombinedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bookingscombined")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingCombinedController {

    @Autowired
    private BookingCombinedService bookingCombinedService;

    // Get all bookings
    @GetMapping
    public List<BookingCombined> getAllBookings() {
        return bookingCombinedService.getAllBookings();
    }

    // Get a booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingCombined> getBookingById(@PathVariable String id) {
        Optional<BookingCombined> booking = bookingCombinedService.getBookingById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new booking
    @PostMapping
    public ResponseEntity<BookingCombined> createBooking(@RequestBody BookingCombined booking) {
        BookingCombined createdBooking = bookingCombinedService.createBooking(booking);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    // Update an existing booking
    @PutMapping("/{id}")
    public ResponseEntity<BookingCombined> updateBooking(@PathVariable String id, @RequestBody BookingCombined booking) {
        BookingCombined updatedBooking = bookingCombinedService.updateBooking(id, booking);
        return updatedBooking != null ? ResponseEntity.ok(updatedBooking) : ResponseEntity.notFound().build();
    }

    // Delete a booking by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable String id) {
        return bookingCombinedService.deleteBooking(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
