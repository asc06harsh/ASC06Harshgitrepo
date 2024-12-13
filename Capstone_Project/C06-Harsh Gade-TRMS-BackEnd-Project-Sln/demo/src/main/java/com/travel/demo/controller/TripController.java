package com.travel.demo.controller;

import com.travel.demo.entity.Trip;
import com.travel.demo.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/trips")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular app
public class TripController {

    private static final String IMAGE_DIR = System.getProperty("user.dir") + "/images/";

    @Autowired
    private TripService tripService;

    @PostMapping
    public ResponseEntity<Trip> createTrip(
            @RequestParam("name") String name,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @RequestParam("price") Double price,
            @RequestParam("image") MultipartFile file) {

        try {
            String fileName = saveImage(file);

            Trip trip = new Trip();
            trip.setName(name);
            trip.setStartDate(LocalDate.parse(startDate));
            trip.setEndDate(LocalDate.parse(endDate));
            trip.setPrice(price);
            trip.setImage(fileName);

            Trip newTrip = tripService.createTrip(trip);
            return ResponseEntity.ok(newTrip);

        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips() {
        List<Trip> trips = tripService.getAllTrips();
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable String id) {
        return tripService.getTripById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @RequestParam("price") Double price,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        try {
            String fileName = file != null ? saveImage(file) : "";

            Trip tripDetails = new Trip();
            tripDetails.setName(name);
            tripDetails.setStartDate(LocalDate.parse(startDate));
            tripDetails.setEndDate(LocalDate.parse(endDate));
            tripDetails.setPrice(price);
            if (!fileName.isEmpty()) {
                tripDetails.setImage(fileName);
            }

            Trip updatedTrip = tripService.updateTrip(id, tripDetails);
            return ResponseEntity.ok(updatedTrip);

        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable String id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }

    private String saveImage(MultipartFile file) throws IOException {
        if (!Files.exists(Paths.get(IMAGE_DIR))) {
            Files.createDirectories(Paths.get(IMAGE_DIR));
        }

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(IMAGE_DIR + fileName);
        Files.write(filePath, file.getBytes());
        return fileName;
    }
}
