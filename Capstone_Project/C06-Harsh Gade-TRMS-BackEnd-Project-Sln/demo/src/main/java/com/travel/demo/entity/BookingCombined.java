package com.travel.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "booking_combined")
public class BookingCombined {

    @Id
    @Column(nullable = false, unique = true)
    private String id;  // Custom ID "CNNNN"

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String tripName;

    @Column(nullable = false)
    private String cabModel;

    @Column(nullable = false)
    private String bookingDate;

    @Column(nullable = false)
    private Double totalPrice;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getTripName() {
        return tripName;
    }

    public void setTripName(String tripName) {
        this.tripName = tripName;
    }

    public String getCabModel() {
        return cabModel;
    }

    public void setCabModel(String cabModel) {
        this.cabModel = cabModel;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
