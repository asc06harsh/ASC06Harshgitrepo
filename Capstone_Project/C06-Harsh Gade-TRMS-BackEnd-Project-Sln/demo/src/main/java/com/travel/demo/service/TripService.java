package com.travel.demo.service;

import com.travel.demo.entity.Trip;
import com.travel.demo.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public Trip createTrip(Trip trip) {
        trip.setId(generateNextId());  // Generate sequential ID
        return tripRepository.save(trip);
    }

    private String generateNextId() {
        String prefix = "T";
        int lastNumber = getLastIdNumber();
        int nextNumber = lastNumber + 1;
        return prefix + String.format("%04d", nextNumber);  // Format as CNNNN
    }

    private int getLastIdNumber() {
        Optional<String> lastId = tripRepository.findLastGeneratedId();
        return lastId.map(id -> Integer.parseInt(id.substring(1))).orElse(0);
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Optional<Trip> getTripById(String id) {
        return tripRepository.findById(id);
    }

    public Trip updateTrip(String id, Trip tripDetails) {
        return tripRepository.findById(id)
                .map(trip -> {
                    trip.setName(tripDetails.getName());
                    trip.setStartDate(tripDetails.getStartDate());
                    trip.setEndDate(tripDetails.getEndDate());
                    trip.setPrice(tripDetails.getPrice());
                    trip.setImage(tripDetails.getImage());
                    return tripRepository.save(trip);
                })
                .orElseThrow(() -> new RuntimeException("Trip not found with id " + id));
    }

    public void deleteTrip(String id) {
        tripRepository.deleteById(id);
    }
}

